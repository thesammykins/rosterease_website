export interface Guide {
  slug: string;
  title: string;
  description: string;
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    steps?: string[];
  }[];
}

export const guides: Guide[] = [
  {
    slug: "getting-started",
    title: "Set up your first schedule",
    description: "Set up a repeating shift pattern or a day of client visits.",
    sections: [
      {
        id: "before-you-start",
        title: "Start with your own schedule",
        paragraphs: [
          "Install the available RosterEase build through TestFlight and open the app. Choose the worker mode that matches the plan you want to manage. You do not need a RosterEase account.",
          "The beta is evolving. Screen labels and available features can vary by build; include your build number when asking for help.",
        ],
      },
      {
        id: "shift",
        title: "For shift work",
        paragraphs: [
          "Use Shift Worker for a repeating roster. You can enter it yourself or use Smart Import and review the result.",
        ],
        steps: [
          "Add a workplace and check its timezone and location.",
          "Set up shift types, including start and end times. Check overnight shifts carefully.",
          "Build your repeating pattern and confirm the date it starts.",
          "Review the calendar before using Today or enabling Calendar sync. Use a per-day change for an exception to the pattern.",
        ],
      },
      {
        id: "field",
        title: "For client visits",
        paragraphs: [
          "Use Field Worker to plan ordered visits. Begin with your client details or import a supported client list.",
        ],
        steps: [
          "Add clients, locations, visit durations and any appointment windows.",
          "Review the active clients, work days and visit order in your setup. If your build offers Visit Days for each client, check those too: a visit must fall on both an enabled work day and a selected client day.",
          "Choose a travel buffer. Optional Maps estimates are a separate choice.",
          "Check Today and future route days before relying on the plan. Recheck the schedule after changing client or work-day details.",
        ],
      },
      {
        id: "check",
        title: "A quick check before your first day",
        paragraphs: [
          "Compare the plan with your original roster or appointments. Check dates, timezone, shift boundaries, travel and any warnings. RosterEase helps organise your plan; it does not verify it with your employer or clients.",
          "Calendar access, Maps estimates and private-note sharing are optional. You can begin planning without turning them all on.",
        ],
      },
    ],
  },
  {
    slug: "smart-import",
    title: "Import a roster or client list",
    description:
      "What Smart Import supports, what to check, and how to handle a result that needs work.",
    sections: [
      {
        id: "source",
        title: "Choose a readable source",
        paragraphs: [
          "Smart Import supports pasted text and supported image or PDF sources. Text extraction and parsing happen on your device. A clear, complete source is easier to review than a cropped or blurred screenshot.",
          "Import only information you are authorised to use. Avoid unnecessary private notes or sensitive workplace information.",
        ],
      },
      {
        id: "review",
        title: "Review before applying",
        paragraphs: [
          "Extracted text can contain mistakes. The review step is where you check the proposed changes, warnings and source rows before applying them.",
        ],
        steps: [
          "Check names, dates, shift times, overnight boundaries and the proposed pattern.",
          "For visits, check each client, address, duration and appointment window. In builds with per-client Visit Days, check those selections too. An import that omits visit days preserves the existing choices.",
          "Correct ambiguous or unsupported rows, or explicitly exclude them where the review allows it. Do not dismiss a warning you have not understood.",
          "Review the effect on the existing plan before you apply. Open Today and Calendar afterward to check the result.",
        ],
      },
      {
        id: "limits",
        title: "Understand the shape of the import",
        paragraphs: [
          "Shift imports create a repeating rotation. A dated roster is not automatically imported as independent dated shifts: any conversion to a pattern must be reviewed and confirmed.",
          "Split shifts and several workplaces in one import are not supported. Import does not guarantee that every roster layout, handwriting style or PDF can be understood.",
          "Field import preserves the supported visit order. It does not optimise a route or infer an entire client-management workflow from a document.",
        ],
      },
      {
        id: "recovery",
        title: "If the result is wrong",
        paragraphs: [
          "Return to the source or review step. Try clearer text, a more readable image or manual entry. Do not apply a result simply to get past a warning.",
          "If you contact support, describe the source format and the step that failed. Redact names, addresses, identifiers and private notes before sharing an example.",
        ],
      },
    ],
  },
  {
    slug: "calendar-and-privacy",
    title: "Choose what leaves the app",
    description:
      "Understand Calendar sync, Maps, private notes and app permissions.",
    sections: [
      {
        id: "calendar",
        title: "Calendar is an explicit choice",
        paragraphs: [
          "In Shift Worker, open Settings > Calendar Sync and select a workplace. Review its destination calendar before enabling sync. Grant the requested system permission if you want to use the feature. Field Worker does not have Calendar Sync.",
          "RosterEase uses generic event-note copy by default. Private shift notes are included only if you enable Include Shift Notes. Anyone with access to the destination calendar may be able to see what is written there.",
          "If permission is denied, review RosterEase permissions in iOS or iPadOS Settings. Reopen the app, check the selected calendar and verify a sample event. Do not delete an entire calendar to troubleshoot duplicate events.",
        ],
      },
      {
        id: "maps",
        title: "Maps receives location details",
        paragraphs: [
          "Opening directions sends the selected address or location text to Maps. Client names and private notes are not included in that request.",
          "Review Settings > Travel Defaults for optional Apple Maps travel estimates, which are off by default. If enabled, address text is used for the estimate. A travel estimate is not a guarantee of arrival time; keep your own buffer for traffic, parking and access.",
        ],
      },
      {
        id: "display",
        title: "Consider what is visible",
        paragraphs: [
          "Open Settings > Privacy & Display to review privacy controls. When privacy lock is on, widgets show private placeholders instead of roster or visit details.",
          "App privacy controls do not remove details you have already chosen to share through Calendar, an exported file or a support message. Review each destination separately.",
        ],
      },
      {
        id: "permissions",
        title: "Change your mind later",
        paragraphs: [
          "Manage system permissions in iOS or iPadOS Settings and feature choices inside RosterEase. Revoking permission can limit that feature while leaving local planning available.",
          "For a full account of information handling, including website hosting and TestFlight feedback, read the Privacy Policy.",
        ],
      },
    ],
  },
  {
    slug: "backup-and-restore",
    title: "Keep a copy of your plan",
    description:
      "Create an encrypted backup and understand what restoring will replace.",
    sections: [
      {
        id: "export",
        title: "Create a backup",
        paragraphs: [
          "Start a backup when you want to save a copy. Exports are encrypted using a passphrase you choose; RosterEase does not back up automatically to a cloud service.",
        ],
        steps: [
          "Open Settings > Data Management and find Backups.",
          "Enter a Backup passphrase of at least 8 characters and repeat it in Confirm passphrase. Tap Export Backup once the button is enabled.",
          "Save the file through the Apple system picker to a location you can find again.",
          "Keep the passphrase securely and separately from the file. Check that the export completed before depending on it.",
        ],
      },
      {
        id: "storage",
        title: "Your file, your storage choice",
        paragraphs: [
          "A backup can include roster, workplace, client, visit and preference data. RosterEase does not keep a server copy of your exported file or recover your chosen passphrase.",
          "If you choose iCloud Drive or another provider, that provider's retention, sharing and deletion rules apply. Anyone with the file and passphrase may be able to restore the contents.",
        ],
      },
      {
        id: "restore",
        title: "Check before restoring",
        paragraphs: [
          "Restore replaces the current RosterEase data on this device. Export a separate copy of the current plan first if you need to keep it.",
        ],
        steps: [
          "Open Settings > Data Management > Backups and tap Restore Backup. Choose the file and enter its passphrase when requested.",
          "Review the backup preview and any compatibility or capacity messages.",
          "Confirm replacement only when you are sure you have the right file.",
          "Check your workplaces, clients, calendar and preferences after restore.",
        ],
      },
      {
        id: "problems",
        title: "If restore cannot continue",
        paragraphs: [
          "For a wrong passphrase, check the original value rather than creating a new one. For an invalid or unsupported file, keep the original backup and contact support with the error text.",
          "Free can restore a backup with one Shift Worker workplace. A backup containing multiple workplaces requires the corresponding Plus access.",
          "If the app cannot open, preserve the installation and your backup files. Do not uninstall or reset it as a first troubleshooting step: local data may be lost. Contact support before taking destructive action.",
        ],
      },
    ],
  },
];
