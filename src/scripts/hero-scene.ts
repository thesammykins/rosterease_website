import {
  ACESFilmicToneMapping,
  AmbientLight,
  Color,
  Box3,
  Vector3,
  DirectionalLight,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  OrthographicCamera,
  PCFShadowMap,
  PlaneGeometry,
  Scene,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  TextureLoader,
  Texture,
  WebGLRenderer,
  PMREMGenerator,
  ShadowMaterial,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { flickRotation, REST_ROTATION } from "./hero-rotation";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

function roundedFace(width: number, height: number, radius: number) {
  const shape = new Shape();
  const x = -width / 2;
  shape.moveTo(x + radius, 0);
  shape.lineTo(x + width - radius, 0);
  shape.quadraticCurveTo(x + width, 0, x + width, radius);
  shape.lineTo(x + width, height - radius);
  shape.quadraticCurveTo(x + width, height, x + width - radius, height);
  shape.lineTo(x + radius, height);
  shape.quadraticCurveTo(x, height, x, height - radius);
  shape.lineTo(x, radius);
  shape.quadraticCurveTo(x, 0, x + radius, 0);
  return shape;
}

export async function mountHeroScene(
  host: HTMLElement,
  mode: "hero" | "preview" = "hero",
) {
  const preview = mode === "preview";
  const images = [
    ...host.querySelectorAll<HTMLImageElement>(
      preview ? "[data-worker-panel] img" : ".re-hero-screen img",
    ),
  ];
  if (images.length !== 2) return;
  const iphone = preview
    ? undefined
    : (await new GLTFLoader().loadAsync("/models/iphone-17-pro-max.glb")).scene;
  const canvas = document.createElement("canvas");
  canvas.className = preview ? "re-preview-canvas" : "re-hero-canvas";
  canvas.setAttribute("aria-hidden", "true");
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  const scene = new Scene();
  const camera = new OrthographicCamera(-1.7, 1.7, 3.5, -0.2, 0.1, 30);
  camera.position.set(preview ? 1.2 : 2.2, preview ? 2.2 : 3.0, 9);
  camera.lookAt(0, preview ? 1.9 : 1.5, 0);

  const environment = new RoomEnvironment();
  const generator = new PMREMGenerator(renderer);
  const environmentMap = generator.fromScene(environment, 0.04);
  scene.environment = environmentMap.texture;
  scene.environmentIntensity = 0.5;
  environment.dispose();
  generator.dispose();
  scene.add(new AmbientLight(0xffffff, 0.5));
  const key = new DirectionalLight(0xffffff, 2);
  key.position.set(-3, 7, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -4;
  key.shadow.camera.right = 4;
  key.shadow.camera.top = 5;
  key.shadow.camera.bottom = -3;
  key.shadow.normalBias = 0.03;
  key.shadow.radius = 4;
  scene.add(key);

  const metal = new MeshStandardMaterial({
    color: 0x434843,
    metalness: 0.85,
    roughness: 0.3,
  });
  const glass = new MeshStandardMaterial({
    color: 0x090d10,
    metalness: 0.15,
    roughness: 0.24,
  });
  const shelfMaterial = new MeshStandardMaterial({
    roughness: 0.85,
    metalness: 0,
  });
  const phones: Group[] = [];
  const screenMaterials: MeshBasicMaterial[] = [];
  let selected =
    document.querySelector<HTMLInputElement>('input[name="worker"]:checked')
      ?.value === "field"
      ? 1
      : 0;
  let blend: { from: number; to: number; start: number } | undefined;
  const loaded = await Promise.allSettled(
    images.map((image) =>
      new TextureLoader().loadAsync(image.currentSrc || image.src),
    ),
  );
  const failed = loaded.find((result) => result.status === "rejected");
  if (failed) {
    loaded.forEach((result) => {
      if (result.status === "fulfilled") result.value.dispose();
    });
    metal.dispose();
    glass.dispose();
    shelfMaterial.dispose();
    environmentMap.dispose();
    renderer.dispose();
    throw new Error("Could not load hero screen textures", {
      cause: failed.reason,
    });
  }
  const textures = loaded.flatMap((result) =>
    result.status === "fulfilled" ? [result.value] : [],
  );
  const screenWidth = 1.13;
  const screenHeight = 2.45;
  textures.forEach((texture, index) => {
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
    const phone = new Group();
    phone.position.set(
      preview ? 0 : index ? 0.73 : -0.73,
      preview ? 0 : index ? 0.085 : 0.18,
      preview ? 0 : index ? 0.12 : -0.03,
    );
    phone.rotation.y = -0.08;
    if (iphone) {
      const model = iphone.clone(true);
      model.rotation.y = Math.PI / 2;
      model.updateMatrixWorld(true);
      const bounds = new Box3().setFromObject(model);
      const size = bounds.getSize(new Vector3());
      const centre = bounds.getCenter(new Vector3());
      const scale = 2.57 / size.y;
      model.scale.multiplyScalar(scale);
      model.position.set(
        -centre.x * scale,
        -bounds.min.y * scale,
        -centre.z * scale,
      );
      // This model's display UVs run backwards outside the unit square.
      texture.flipY = false;
      texture.repeat.set(-1.028278, -1);
      texture.offset.set(0.020257, 1.0019);
      model.traverse((object) => {
        if (!(object instanceof Mesh)) return;
        object.castShadow = true;
        object.receiveShadow = true;
        const replace = (original: MeshStandardMaterial) => {
          if (original.name === "screen.001") {
            const screen = new MeshBasicMaterial({
              map: texture,
              side: DoubleSide,
              toneMapped: false,
            });
            screenMaterials.push(screen);
            return screen;
          }
          const material = original.clone();
          if (
            [
              "basecolor.001",
              "metalframe.002",
              "backpanel.001",
              "Material.005",
            ].includes(material.name)
          ) {
            material.color.set(0xa9aba8);
            material.metalness = 0.65;
            material.roughness = 0.38;
          }
          return material;
        };
        object.material = Array.isArray(object.material)
          ? object.material.map((material) =>
              replace(material as MeshStandardMaterial),
            )
          : replace(object.material as MeshStandardMaterial);
      });
      phone.add(model);
    } else {
      const body = new Mesh(
        new ExtrudeGeometry(roundedFace(1.23, 2.57, 0.15), {
          depth: 0.115,
          bevelEnabled: true,
          bevelSegments: 4,
          steps: 1,
          bevelSize: 0.012,
          bevelThickness: 0.012,
          curveSegments: 12,
        }),
        metal,
      );
      body.visible = !preview || index === 0;
      body.castShadow = true;
      body.receiveShadow = true;
      phone.add(body);
      const rim = new Mesh(
        new ShapeGeometry(roundedFace(1.205, 2.545, 0.14), 12),
        glass,
      );
      rim.visible = !preview || index === 0;
      rim.position.set(0, 0.012, 0.13);
      phone.add(rim);
      const geometry = new ShapeGeometry(
        roundedFace(screenWidth, screenHeight, 0.115),
        12,
      );
      const positions = geometry.getAttribute("position");
      const uv = geometry.getAttribute("uv");
      for (let i = 0; i < positions.count; i++)
        uv.setXY(
          i,
          positions.getX(i) / screenWidth + 0.5,
          positions.getY(i) / screenHeight,
        );
      const screenMaterial = new MeshBasicMaterial({
        map: texture,
        toneMapped: false,
        transparent: preview,
        opacity: !preview || index === selected ? 1 : 0,
        depthWrite: !preview,
      });
      screenMaterials.push(screenMaterial);
      const screen = new Mesh(geometry, screenMaterial);
      screen.renderOrder = index;
      screen.position.set(0, 0.06, 0.132);
      phone.add(screen);
    }
    scene.add(phone);
    phones.push(phone);

    if (preview) return;
    const height = index ? 0.085 : 0.18;
    const shelf = new Mesh(
      new RoundedBoxGeometry(1.5, height, 0.9, 4, 0.04),
      shelfMaterial,
    );
    shelf.position.set(index ? 0.77 : -0.77, height / 2 - 0.015, 0);
    shelf.receiveShadow = true;
    shelf.castShadow = true;
    scene.add(shelf);
  });
  if (!preview) {
    const floor = new Mesh(
      new PlaneGeometry(12, 12),
      new ShadowMaterial({ opacity: 0.09 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.035;
    floor.receiveShadow = true;
    scene.add(floor);
  }

  let frame = 0;
  let visible = true;
  let disposed = false;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const targets = [REST_ROTATION, REST_ROTATION];
  let drag:
    | {
        index: number;
        x: number;
        time: number;
        velocity: number;
        travel: number;
      }
    | undefined;
  let spin:
    { index: number; from: number; to: number; start: number } | undefined;

  function render() {
    frame = 0;
    if (!visible || disposed) return;
    let moving = false;
    phones.forEach((phone, index) => {
      if (spin?.index === index && !reduced.matches) {
        const progress = Math.min((performance.now() - spin.start) / 1500, 1);
        phone.rotation.y =
          spin.from + (spin.to - spin.from) * (1 - (1 - progress) ** 3);
        moving ||= progress < 1;
        if (progress === 1) {
          phone.rotation.y = REST_ROTATION;
          targets[index] = REST_ROTATION;
          spin = undefined;
          host.dataset.spinning = "false";
        }
      } else {
        const difference = targets[index] - phone.rotation.y;
        phone.rotation.y += reduced.matches ? difference : difference * 0.16;
        if (Math.abs(difference) > 0.0005) moving = true;
      }
    });
    if (blend) {
      const progress = reduced.matches
        ? 1
        : Math.min((performance.now() - blend.start) / 320, 1);
      screenMaterials[blend.to].opacity = progress;
      if (progress === 1) {
        screenMaterials[blend.from].opacity = 0;
        blend = undefined;
      } else moving = true;
    }
    renderer.render(scene, camera);
    if (moving) frame = requestAnimationFrame(render);
    else host.dataset.renderState = "idle";
  }
  function invalidate() {
    if (!frame && visible && !disposed) {
      host.dataset.renderState = "active";
      frame = requestAnimationFrame(render);
    }
  }
  function resize() {
    const width = host.clientWidth;
    const caption = preview
      ? (host.querySelector<HTMLElement>(
          '[data-worker-panel="' +
            (selected ? "field" : "shift") +
            '"] .re-worker-caption',
        )?.offsetHeight ?? 58)
      : 0;
    const height = host.clientHeight - (preview ? caption : 30);
    canvas.style.top = caption + "px";
    canvas.style.height = height + "px";
    const span = preview ? 1.72 : Math.max(3.4, (3.15 * height) / width);
    camera.left = (-span * width) / height / 2;
    camera.right = (span * width) / height / 2;
    camera.top = span / 2;
    camera.bottom = -span / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    invalidate();
  }
  function theme() {
    shelfMaterial.color = new Color(
      getComputedStyle(host).getPropertyValue("--re-bg-soft").trim(),
    );
    invalidate();
  }
  const listeners = new AbortController();
  host.addEventListener(
    "pointerdown",
    (event) => {
      if (preview || reduced.matches || event.button !== 0 || spin) return;
      event.preventDefault();
      const bounds = host.getBoundingClientRect();
      const index = event.clientX - bounds.left < bounds.width / 2 ? 0 : 1;
      drag = {
        index,
        x: event.clientX,
        time: event.timeStamp,
        velocity: 0,
        travel: 0,
      };
      host.setPointerCapture(event.pointerId);
      host.dataset.dragging = "true";
    },
    { signal: listeners.signal },
  );
  host.addEventListener(
    "pointermove",
    (event) => {
      if (reduced.matches || spin) return;
      const bounds = host.getBoundingClientRect();
      if (drag) {
        const delta = ((event.clientX - drag.x) / bounds.width) * 6;
        drag.velocity =
          delta / Math.max((event.timeStamp - drag.time) / 1000, 0.008);
        drag.travel += delta;
        drag.x = event.clientX;
        drag.time = event.timeStamp;
        targets[drag.index] =
          REST_ROTATION + Math.max(-0.9, Math.min(0.9, drag.travel));
      } else if (event.pointerType === "mouse") {
        const fraction = (event.clientX - bounds.left) / bounds.width;
        const index = fraction < 0.5 ? 0 : 1;
        if (preview) targets.fill(REST_ROTATION + (fraction - 0.5) * 0.2);
        else {
          targets[1 - index] = REST_ROTATION;
          targets[index] = REST_ROTATION + (((fraction * 2) % 1) - 0.5) * 0.24;
        }
      }
      invalidate();
    },
    { passive: true, signal: listeners.signal },
  );
  function release(event: PointerEvent) {
    if (!drag) return;
    const target =
      event.type === "pointerup" && event.timeStamp - drag.time < 120
        ? flickRotation(drag.velocity, drag.travel)
        : null;
    if (target !== null && !reduced.matches) {
      spin = {
        index: drag.index,
        from: phones[drag.index].rotation.y,
        to: target,
        start: performance.now(),
      };
      host.dataset.spinning = "true";
    } else targets.fill(REST_ROTATION);
    drag = undefined;
    host.dataset.dragging = "false";
    if (host.hasPointerCapture(event.pointerId))
      host.releasePointerCapture(event.pointerId);
    invalidate();
  }
  host.addEventListener("pointerup", release, { signal: listeners.signal });
  host.addEventListener("pointercancel", release, { signal: listeners.signal });
  host.addEventListener(
    "pointerleave",
    () => {
      if (!drag && !spin) {
        targets.fill(REST_ROTATION);
        invalidate();
      }
    },
    { signal: listeners.signal },
  );
  if (preview) {
    document
      .querySelectorAll<HTMLInputElement>('input[name="worker"]')
      .forEach((input) => {
        input.addEventListener(
          "change",
          () => {
            const next = input.value === "field" ? 1 : 0;
            if (next === selected) return;
            screenMaterials[selected].opacity = 1;
            screenMaterials[next].opacity = 0;
            phones[next].children.at(-1)!.renderOrder = 2;
            phones[selected].children.at(-1)!.renderOrder = 1;
            blend = { from: selected, to: next, start: performance.now() };
            selected = next;
            resize();
          },
          { signal: listeners.signal },
        );
      });
  }
  reduced.addEventListener(
    "change",
    () => {
      spin = undefined;
      drag = undefined;
      host.dataset.spinning = "false";
      targets.fill(REST_ROTATION);
      invalidate();
    },
    { signal: listeners.signal },
  );
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const themeObserver = new MutationObserver(theme);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const systemTheme = matchMedia("(prefers-color-scheme: dark)");
  systemTheme.addEventListener("change", theme, { signal: listeners.signal });
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) invalidate();
  });
  observer.observe(host);
  host.append(canvas);
  theme();
  resize();
  renderer.render(scene, camera);
  host.dataset.scene = "ready";
  canvas.addEventListener(
    "webglcontextlost",
    (event) => {
      event.preventDefault();
      host.dataset.scene = "fallback";
      console.info("3D context lost; showing static RosterEase hero.");
      dispose();
    },
    { signal: listeners.signal },
  );

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    listeners.abort();
    observer.disconnect();
    resizeObserver.disconnect();
    themeObserver.disconnect();
    scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.geometry.dispose();
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material) => material.dispose());
      }
    });
    iphone?.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      materials.forEach((material) => {
        for (const value of Object.values(material)) {
          if (value instanceof Texture) value.dispose();
        }
        material.dispose();
      });
    });
    metal.dispose();
    glass.dispose();
    shelfMaterial.dispose();
    textures.forEach((texture) => texture.dispose());
    environmentMap.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
    delete host.dataset.scene;
    delete host.dataset.renderState;
  }
  window.addEventListener(
    "pagehide",
    (event) => {
      if (!event.persisted) dispose();
    },
    { signal: listeners.signal },
  );
  return dispose;
}
