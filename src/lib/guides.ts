import type { HelpRecordingName, HelpScreen } from "./screenshots";

export interface Guide {
  slug: string;
  title: string;
  description: string;
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    steps?: string[];
    screens?: HelpScreen[];
    recording?: HelpRecordingName;
  }[];
}

// Each slug is a `HelpArticle` case in the app (Sources/Shared/HelpArticleLink.swift).
// Removing or renaming one breaks a "Learn more" link in a shipped build.
export const guides: Guide[] = [
  {
    slug: "getting-started",
    title: "Set up your first schedule",
    description: "Set up a repeating shift pattern or a day of client visits.",
    sections: [
      {
        id: "before-you-start",
        screens: ["getting-started"],
        title: "Start with your own schedule",
        paragraphs: [
          "Install RosterEase from the App Store and open the app. You do not need a RosterEase account.",
          "Choose Shifts for rostered shifts at a workplace, like nursing, retail or hospitality. Choose Visits for going to clients’ homes or sites, like home care, cleaning or mobile trades.",
          "Screen labels and available features can vary by app version; include your version and build number when asking for help.",
        ],
      },
      {
        id: "shift",
        screens: ["getting-started-preview"],
        title: "For shift work",
        paragraphs: [
          "In Shifts, enter your roster yourself or use Smart Import and review the result.",
        ],
        steps: [
          "Add a workplace and check its timezone and location.",
          "Set up shift types, including start and end times. Check overnight shifts carefully.",
          "Build your repeating pattern and confirm the date it starts. With no rotation, choose “I don't have a rotation, just add shifts”.",
          "Review the calendar before using Today or turning on Calendar Sync. Use a one-off change in Calendar for an exception to the pattern.",
        ],
      },
      {
        id: "field",
        title: "For client visits",
        paragraphs: [
          "In Visits, plan ordered visits. Begin with your client details or import a client list.",
        ],
        steps: [
          "Add clients, locations, visit durations and any appointment windows.",
          "Check each client’s visit days and your work days. A visit is planned only on a day that is both.",
          "Choose a travel buffer in Settings > Travel. Apple Maps estimates are a separate choice.",
          "Check Today and future route days before relying on the plan.",
        ],
      },
      {
        id: "plans",
        title: "Plans and the trial",
        paragraphs: [
          "Finishing setup starts a free week of full Plus. Nothing is charged and nothing renews. Afterwards RosterEase stays free unless you subscribe, and everything you saved stays. See Free and RosterEase Plus for what each plan includes.",
        ],
      },
      {
        id: "work-type",
        title: "Switching between Shifts and Visits",
        paragraphs: [
          "The work type is fixed after setup. To switch, save a backup in Settings > Data Management, reset app data there, then complete setup again.",
          "Reset deletes this device’s records, notes, settings and automatic backup setup, and tries to remove synced Calendar events first. Saved backup files and the backup key remain.",
        ],
      },
      {
        id: "check",
        title: "A quick check before your first day",
        paragraphs: [
          "Compare the plan with your original roster or appointments. Check dates, timezone, shift boundaries, travel and any warnings. RosterEase helps organise your plan; it does not verify it with your employer or clients.",
          "Calendar access, Maps estimates and other optional features can wait. You can begin planning without turning them on.",
        ],
      },
    ],
  },
  {
    slug: "plus-plans",
    title: "Free and RosterEase Plus",
    description: "What the free plan includes, what Plus adds and how the setup trial works.",
    sections: [
      {
        id: "free",
        title: "What’s free",
        paragraphs: [
          "Shifts: one workplace with your roster, Calendar, widgets, backups, notes and checking in and out by hand.",
          "Visits: five active clients with routes, visit progress, notes, Calendar, widgets and backups.",
          "Live Activities and the Siri shortcuts that open Today, Calendar and Import are free too, as are two successful AI import assists a day on each device.",
        ],
      },
      {
        id: "plus",
        screens: ["plus-plans-sheet"],
        title: "What Plus adds",
        paragraphs: [
          "Shift Plus adds more workplaces, worked times suggested from location, pinned workplace notes, Siri roster answers and actions, and more AI import assists.",
          "Visits Plus adds more active clients, Siri visit answers and actions, and more AI import assists. It includes Shift Plus.",
          "Each plan is monthly or annual, at the price the App Store shows. Subscriptions renew until you cancel them in your App Store account settings.",
        ],
      },
      {
        id: "trial",
        screens: ["plus-plans"],
        title: "The setup trial",
        paragraphs: [
          "Finishing setup starts a free week of full Plus. Nothing is charged and nothing renews. The trial is given once. Resetting app data doesn’t start another, and reinstalling usually doesn’t either.",
          "Settings > RosterEase Plus shows when your trial ends, with See Plus Plans and Restore purchases.",
        ],
      },
      {
        id: "ending",
        title: "If a subscription ends",
        paragraphs: [
          "Everything you saved stays. Adding past the free limits and the automated extras stop: pinned notes read as ordinary notes, location monitoring stops and Siri roster answers stop.",
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
          "Smart Import reads pasted text, images and PDFs. Text in photos and PDFs is read on your device. A clear, complete source is easier to review than a cropped or blurred screenshot.",
          "Import only information you are authorised to use. Avoid unnecessary private notes or sensitive workplace information.",
        ],
      },
      {
        id: "assist",
        title: "Optional AI assist",
        paragraphs: [
          "If a source is hard to read, Smart Import can offer Assist on this device. It uses Apple’s on-device model where your iPhone supports it. Where it isn’t available, ordinary import still works.",
          "An assist only proposes text. Compare it with the original and correct names, dates, times and rows before you analyse it.",
          "Free includes two successful assists a day on this device; failed or cancelled requests don’t count. Shift Plus and Visits Plus include more. Apple’s availability and usage limits still apply.",
        ],
      },
      {
        id: "review",
        screens: ["shiftImport", "fieldImport"],
        recording: "import-review",
        title: "Review before applying",
        paragraphs: [
          "Extracted text can contain mistakes. The review step is where you check the proposed changes, warnings and source rows before applying them.",
        ],
        steps: [
          "Check names, dates, shift times and overnight boundaries.",
          "For visits, check each client, address, duration, appointment window and visit days. An import that leaves out visit days keeps the existing choices.",
          "Correct ambiguous or unsupported rows, or exclude them where the review allows it. Do not dismiss a warning you have not understood.",
          "Review the effect on the existing plan before you apply. Open Today and Calendar afterward to check the result.",
        ],
      },
      {
        id: "limits",
        title: "Dated shifts or a rotation",
        paragraphs: [
          "A dated roster can be imported as dated shifts or as a repeating rotation.",
          "As dated shifts, each row becomes a shift on its date, and two rows on one date make a split or double shift. Dates before today are not added. As a rotation, the rows become a cycle that repeats after the last date.",
          "One import covers one workplace. Import does not guarantee that every roster layout, handwriting style or PDF can be understood.",
          "Client imports keep the order of the source. RosterEase does not optimise a route.",
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
    slug: "shift-changes",
    title: "Change a shift or your rotation",
    description: "One-off changes, extra shifts, short-rest warnings and roster change notes.",
    sections: [
      {
        id: "one-day",
        screens: ["shift-changes"],
        recording: "change-one-day",
        title: "Change one day",
        paragraphs: [
          "Use Calendar to change a single date. A one-off change affects only that day and leaves your rotation intact. Remove change returns the day to the pattern.",
          "To change future weeks, edit the rotation in the Workplace tab instead.",
        ],
      },
      {
        id: "extra",
        screens: ["shiftCalendar"],
        title: "Split or double shifts",
        paragraphs: [
          "Add shift puts a dated shift on a day without removing what is already there, so two shifts make a split or double shift.",
        ],
      },
      {
        id: "rest",
        title: "Short rest warnings",
        paragraphs: [
          "When you change or add a shift, RosterEase tells you if it overlaps another shift or leaves less than 10 hours of rest before or after it. Today shows “Short rest · under 10 h”. These are notes only; you can still save.",
        ],
      },
      {
        id: "changed",
        screens: ["shift-changes-today"],
        title: "What changed since you last looked",
        paragraphs: [
          "Today compares your roster with what it last showed you and lists days that changed, such as “Changed since Mon: Sat now Night 7:00 pm”. Changes from Calendar, an import or a rotation edit all count. Dismissing the note accepts the roster as it is now.",
        ],
      },
    ],
  },
  {
    slug: "recording-an-absence",
    title: "Record an absence",
    description: "Mark a shift you aren’t working without changing your rotation.",
    sections: [
      {
        id: "record",
        screens: ["recording-an-absence"],
        recording: "record-an-absence",
        title: "Record it from Today",
        paragraphs: [
          "In Shifts, swipe left on today’s shift card, choose an absence type and save. A shift that ended without a record asks you to record it as worked or not working.",
          "Not working today records an absence without health detail. Sick day is for when illness kept you from working.",
        ],
      },
      {
        id: "effect",
        title: "What it changes",
        paragraphs: [
          "The absence is recorded in RosterEase only; your workplace is not notified. It doesn’t count as a completed shift. Your rotation, future shifts and Calendar events stay unchanged.",
          "Undo not working on Today restores the previous record.",
        ],
      },
      {
        id: "types",
        title: "Absence types",
        paragraphs: [
          "In Settings > Absence Types, choose the type Today starts with and add your own. Renaming or removing a type changes future choices only; recorded absences keep their label.",
          "Your own types stay on this device. Recorded labels are included in backups.",
        ],
      },
    ],
  },
  {
    slug: "notes-and-check-ins",
    title: "Notes and check-ins",
    description: "Write dated notes, add optional captures and record check-in times.",
    sections: [
      {
        id: "notes",
        screens: ["notes-and-check-ins"],
        title: "Notes",
        paragraphs: [
          "In Shifts, a note is saved with its workplace and the date of the shift. In Visits, check in to a visit from Today to add notes for that client. The first line of a note becomes its title.",
          "Editing a saved note adds a revision; earlier versions stay. With Shift Plus you can pin a note so it shows on every shift card at that workplace. Without Plus it reads as an ordinary note.",
        ],
      },
      {
        id: "captures",
        title: "Optional captures",
        paragraphs: [
          "In Settings > Notes & Templates you can allow photos, a location, a signature and voice notes. All are off until you turn them on, and each capture needs a tap. Turning an option off keeps what you already saved.",
          "How each one is kept, and what it can’t prove, is in How your records work.",
        ],
      },
      {
        id: "check-ins",
        screens: ["notes-and-check-ins-check-in"],
        title: "Shift check-ins",
        paragraphs: [
          "Turn on Shift check-ins in Settings > Notes & Templates. Today then offers Check in and Check out from an hour before a timed shift until 30 minutes after it ends. Each records the device time in that shift’s notes, without a location.",
          "For reminders, turn on Reminders Before Work and Remind Me to Check In and Out in Settings > Notifications. You’re reminded ten minutes after an unchecked shift starts and when a checked-in shift ends.",
        ],
      },
    ],
  },
  {
    slug: "how-your-records-work",
    title: "How your records work",
    description: "What a saved note keeps, what a signature shows, and what records can’t prove.",
    sections: [
      {
        id: "kept",
        screens: ["how-your-records-work"],
        title: "What a note can keep",
        paragraphs: [
          "Records stay on your phone unless you turn on a feature that shares them.",
        ],
        steps: [
          "Photos are saved small. A photo’s location is removed unless Keep photo locations is on.",
          "A location is one point with its accuracy and time, never a route. Place names are looked up with Apple when shown.",
          "Voice notes record up to 15 minutes. Transcription runs on this device and can make mistakes, so check the transcript before attaching. Audio is not uploaded for transcription.",
          "Template fields include text, numbers, yes or no, choices, checklists, dates, times, durations, a 1–5 scale and photos. Saved notes keep the fields they were written with.",
        ],
      },
      {
        id: "signatures",
        title: "Signatures",
        paragraphs: [
          "Draw a signature or type a name to agree to the note as shown. Editing the note later needs a new signature.",
          "The signature is sealed with a key that stays on this phone. The stamp shows whether the note is unchanged since signing, was sealed on another installation, couldn’t be sealed, or no longer matches. It is evidence of signing in RosterEase, not identity verification.",
        ],
      },
      {
        id: "history",
        title: "Visit history",
        paragraphs: [
          "In Visits, check-ins, finished visits and visits that didn’t happen are kept in Settings > Privacy > Visit History. Undo adds a correction instead of erasing. In Shifts, check-ins and their corrections stay with the shift.",
        ],
      },
      {
        id: "limits",
        title: "What records can’t prove",
        paragraphs: [
          "Times come from the device clock. Locations, signatures and check-ins don’t independently verify attendance or identity, and author labels are entered by you. Completion and payroll are separate from check-ins.",
          "Note templates provide editable fields. They do not validate clinical decisions or make RosterEase an approved clinical-record system. Use your organisation’s approved system where required.",
        ],
      },
    ],
  },
  {
    slug: "location-review",
    title: "Suggest worked times from location",
    description: "How location review notices arrivals at a pinned workplace, the access it needs, and what happens without Plus.",
    sections: [
      {
        id: "what",
        screens: ["location-review"],
        title: "What it does",
        paragraphs: [
          "In Shifts, location review notices when you arrive at and leave a workplace whose pin you’ve confirmed, then suggests those times for you to confirm. It never records a shift on its own.",
          "It watches 150 m around each confirmed pin with a shift today or tomorrow, up to 20 workplaces. Arrivals more than two hours either side of a shift are ignored.",
        ],
      },
      {
        id: "set-up",
        title: "Set it up",
        paragraphs: [],
        steps: [
          "Open Settings > Privacy > Location Review and turn it on.",
          "Allow location While Using, then Always. With While Using, suggestions need the app open. iOS asks only once; after that, change it in iOS Settings.",
          "Keep Precise Location on. Approximate location can’t resolve 150 m.",
          "Drag each workplace’s pin onto the entrance you use and confirm it.",
        ],
      },
      {
        id: "kept",
        title: "What is kept",
        paragraphs: [
          "No other location history is kept. Arrivals and departures clear once that workplace day is reviewed and the undo window passes, or 30 days after its last shift ends.",
        ],
      },
      {
        id: "without-plus",
        title: "Without Plus",
        paragraphs: [
          "Location review needs Shift Plus; Visits Plus includes it. If a subscription ends, monitoring stops. Saved pins and suggestions stay, and you can remove a pin, but moving or confirming one needs Plus. Checking in and out by hand stays free.",
        ],
      },
    ],
  },
  {
    slug: "visit-routes",
    title: "How visit routes are built",
    description: "Where route days come from, when they change, and why today and past days are protected.",
    sections: [
      {
        id: "built",
        screens: ["visit-routes", "visit-routes-shared-location"],
        title: "Where routes come from",
        paragraphs: [
          "In Visits, RosterEase plans the next two weeks from your active clients, your work days and each client’s visit days.",
          "Visits follow the order in Clients from 8:00, with your travel buffer between them and each appointment window respected. Clients at the same saved location stay together where their windows allow.",
          "RosterEase does not optimise the order. Imports keep the order of the source.",
        ],
      },
      {
        id: "rebuilding",
        title: "Rebuilding",
        paragraphs: [
          "Changing clients, work days or the travel buffer, or importing clients, updates unfinished planned visits on upcoming days. Manual add-ons, finished visits and the visit you’re checked in to stay.",
          "To rebuild one future day, select it in Calendar and regenerate it. Visit order may change, missing clients may be added, and removed clients may drop off.",
        ],
      },
      {
        id: "protected",
        title: "Protected days",
        paragraphs: [
          "Today and past route days are protected: Calendar won’t regenerate them. Use Today to finish current visits.",
        ],
      },
      {
        id: "addresses",
        title: "Address quality",
        paragraphs: [
          "A blank address, or one without a street number and street name, shows a warning. Add a full street address before relying on Apple Maps travel times; RosterEase won’t guess a route from a missing or broad location.",
          "Other warnings ask you to fit a visit’s duration inside its appointment window, or to shorten durations, buffers or windows when the route runs past the end of the day.",
        ],
      },
    ],
  },
  {
    slug: "travel-time",
    title: "Leave-by times and travel estimates",
    description: "How RosterEase works out when to leave, what the buffer does, and what Apple Maps receives.",
    sections: [
      {
        id: "leave-by",
        screens: ["shiftToday"],
        title: "How leave-by is worked out",
        paragraphs: [
          "Leave-by is your start time minus the travel time RosterEase allows. Without an Apple Maps estimate, that is your travel buffer. With one, it is the estimated drive plus your buffer.",
          "In Visits, a visit at the same address as the one before needs no travel, and the first visit without an estimate shows its start time instead.",
        ],
      },
      {
        id: "buffer",
        screens: ["travel-time-settings"],
        title: "Your buffer and start location",
        paragraphs: [
          "In Settings > Travel, set Travel Buffer between 5 and 120 minutes (15 by default) and Start Location to where you usually leave from.",
        ],
      },
      {
        id: "apple-maps",
        title: "Apple Maps estimates",
        paragraphs: [
          "Apple Maps Estimates is off until you turn it on in Settings > Travel. Estimates are optional and use addresses without client names or notes: the start and destination addresses are sent to Apple for a driving estimate.",
          "If no estimate is available, for example with an incomplete address or no network, your buffer is used instead. An estimate is not a guarantee; allow for traffic, parking and access.",
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
        screens: ["calendar-and-privacy"],
        title: "Calendar is an explicit choice",
        paragraphs: [
          "In Shifts, open Settings > Calendar Sync and choose a workplace. Turn on Sync workplace shifts and choose where events go: the app default, a dedicated workplace calendar or a specific iOS calendar. Visits does not have Calendar Sync.",
          "Each event shows the shift and workplace with the note “Synced from RosterEase”. Include Shift Info also adds each day’s Shift info, the optional text you add when changing a day in Calendar. Private notes stay in RosterEase. Anyone with access to the destination calendar may see what is written there.",
          "Do not delete an entire calendar to troubleshoot duplicate events.",
        ],
      },
      {
        id: "calendar-permission",
        title: "Calendar permission",
        paragraphs: [
          "RosterEase asks for full calendar access because it creates, updates and removes the events it syncs. Access to add events only is not enough. If access is missing, tap Allow Calendar Access or change it in iOS Settings, then check a sample event.",
        ],
      },
      {
        id: "maps",
        title: "Maps receives location details",
        paragraphs: [
          "Opening directions sends the selected address to Maps. Client names and private notes are not included.",
          "Apple Maps travel estimates are off by default. See Leave-by times and travel estimates for what they send.",
        ],
      },
      {
        id: "display",
        title: "Consider what is visible",
        paragraphs: [
          "Settings > Privacy controls what notifications, widgets, Live Activities, Siri and app previews show. See Use the privacy lock.",
          "App privacy controls do not remove details you have already shared through Calendar, an exported file or a support message. Review each destination separately.",
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
    slug: "live-activities",
    title: "Follow your work on the Lock Screen",
    description: "What the RosterEase Live Activity shows, when it appears and how to keep it private.",
    sections: [
      {
        id: "turn-on",
        title: "Turn it on",
        paragraphs: [
          "Live Activities are optional and free. In Settings > Notifications, turn on Show Live Activities. If iOS has them turned off for RosterEase, use Open iOS Settings.",
          "This is a setting for this device. It stays off on other devices, including after you restore a backup.",
        ],
      },
      {
        id: "shows",
        title: "What it shows",
        paragraphs: [
          "For a shift: when to leave, then a countdown to your finish, your next shift and the rest before it. For visits: how many visits are done, the next visit and when the route ends.",
          "It appears on the Lock Screen and, on supported iPhones, in the Dynamic Island. Times use the workplace or route time zone.",
        ],
      },
      {
        id: "when",
        title: "When it appears",
        paragraphs: [
          "Open RosterEase when your work day starts. A Live Activity appears when there is a current or upcoming shift or visit, and may not appear on a day off. A finished one leaves about 30 minutes later.",
        ],
      },
      {
        id: "private",
        title: "Keep it private",
        paragraphs: [
          "Turn on Hide Live Activity details in Settings > Privacy. It then shows generic content, such as “Shift details private”, everywhere, including the Dynamic Island and StandBy, even after you unlock.",
        ],
      },
    ],
  },
  {
    slug: "siri",
    title: "Use Siri and Shortcuts",
    description: "What you can ask, what Siri can record, and how answers stay private.",
    sections: [
      {
        id: "free",
        title: "Free shortcuts",
        paragraphs: [
          "Opening Today, Calendar and Import is free. Try “Open today in RosterEase”.",
        ],
      },
      {
        id: "answers",
        title: "Roster answers",
        paragraphs: [
          "Roster answers need Shift Plus or Visits Plus. Turn on Allow Siri roster answers in Settings > Siri & Shortcuts.",
          "Ask about today, tomorrow or a day this week, your next shift or visit, when you finish, or the next seven days. For example, “When’s my next shift in RosterEase?” In Shortcuts, Read Roster Day accepts any date.",
          "Answers come from what is saved in RosterEase, not changes your employer hasn’t added to the app.",
        ],
      },
      {
        id: "actions",
        title: "Recording with Siri",
        paragraphs: [
          "In Shifts, Siri can mark today’s shift worked or not working, check you in or out when Shift check-ins are on, and add a quick note. In Visits, it can check you in to your next visit or mark the visit you’re at complete.",
          "Siri says what it will save and waits for you to confirm. You can undo from Today.",
        ],
      },
      {
        id: "privacy",
        title: "Privacy",
        paragraphs: [
          "Unlock your device before asking for roster details. Siri says “Visit 2 of 5” instead of a client’s name unless you turn on Say client names. Addresses, phone numbers and note contents are never shared with Siri or Shortcuts.",
          "Hide details in Siri answers, in Settings > Privacy, gives generic answers and counts even after you authenticate. Authentication is still required, and a paired device may satisfy it. Siri can speak aloud, so consider who can hear.",
        ],
      },
      {
        id: "apple-intelligence",
        title: "Apple Intelligence",
        paragraphs: [
          "These shortcuts work with Siri without Apple Intelligence. Newer Siri features depend on your device, software, language, region and Apple settings.",
          "RosterEase reads saved shifts and visits on your device, passes the answer you asked for to Siri and saves only changes you confirm. It does not send answers to a RosterEase AI server or keep a Siri conversation history.",
          "Apple manages Siri processing. Apple Intelligence can process requests on device or use Private Cloud Compute for more complex requests. Apple says data processed by Private Cloud Compute is not retained.",
        ],
      },
    ],
  },
  {
    slug: "privacy-lock",
    title: "Use the privacy lock",
    description: "Require Face ID, Touch ID or your passcode, and choose what shows outside the app.",
    sections: [
      {
        id: "lock",
        screens: ["privacy-lock", "privacy-lock-screen"],
        title: "Require unlock",
        paragraphs: [
          "Turn on Require Unlock in Settings > Privacy, and Face ID, Touch ID or your passcode opens RosterEase. Ask Again sets how long you can be away first, from Immediately to 1 Hour.",
          "Turning the lock off needs authentication. These settings stay on this device and aren’t in backups.",
        ],
      },
      {
        id: "outside",
        title: "Details outside RosterEase",
        paragraphs: [
          "You can hide details in notifications, widgets, Live Activities, Siri answers and app switcher previews. Each is separate from Require Unlock, and everything inside the app stays visible.",
        ],
      },
      {
        id: "notifications",
        title: "Notifications and Show Previews",
        paragraphs: [
          "Hidden notification details follow iPhone’s Show Previews. Always keeps details visible on the Lock Screen; Never hides them even after you unlock. For hiding only while locked, choose When Unlocked in iPhone Settings > Notifications. Changes apply to reminders not yet delivered.",
        ],
      },
      {
        id: "widgets",
        title: "Lock Screen widgets",
        paragraphs: [
          "Hidden widget details also need Lock Screen Widgets turned off in iPhone Settings > Face ID & Passcode > Allow Access When Locked. Otherwise iOS can show details while locked. RosterEase can’t read that setting.",
        ],
      },
      {
        id: "siri",
        title: "Siri on paired devices",
        paragraphs: [
          "With Hide details in Siri answers on, Siri gives generic answers and counts, even after authentication. Siri still requires authentication, and a paired device may satisfy it. Siri can speak aloud, so consider who can hear.",
        ],
      },
    ],
  },
  {
    slug: "backup-and-restore",
    title: "Keep a copy of your plan",
    description:
      "Save encrypted backups, keep your backup key, and understand what restoring replaces.",
    sections: [
      {
        id: "export",
        screens: ["backup-and-restore"],
        recording: "save-a-backup",
        title: "Save a backup",
        paragraphs: [
          "In Settings > Data Management, tap Save backup… and choose where to save it. A backup holds your records, note history and preferences, encrypted.",
          "Weekly Automatic Backup saves to a folder you choose each week and keeps the newest four. Back up now saves one straight away.",
        ],
      },
      {
        id: "key",
        title: "Your backup key",
        paragraphs: [
          "One backup key opens every backup, saved or weekly. RosterEase creates it and keeps it in Keychain; it syncs with iCloud Keychain when that’s on.",
          "Without the key, a backup can’t be opened. Show backup key in Data Management needs Face ID, Touch ID or your passcode. Keep a copy somewhere safe, especially without iCloud Keychain.",
        ],
      },
      {
        id: "storage",
        title: "Your file, your storage choice",
        paragraphs: [
          "RosterEase does not keep a server copy of your backup or your key. If you save to iCloud Drive or another provider, its retention, sharing and deletion rules apply. Anyone with the file and the key may be able to restore it.",
        ],
      },
      {
        id: "restore",
        title: "Check before restoring",
        paragraphs: [
          "Tap Restore backup in Data Management and choose the file. If the key isn’t in iCloud Keychain, enter the backup key used to save it. Review what the backup contains before you confirm.",
          "Restoring replaces all RosterEase data and preferences on this device and updates Calendar Sync events. Save a backup of the current data first if you need it.",
        ],
      },
      {
        id: "earlier-version",
        screens: ["backup-and-restore-recovery"],
        title: "Data from version 1.0",
        paragraphs: [
          "This version stores your roster in a new layout and can’t open data from the earlier version. If you see Start fresh with this version, tap Save a copy to keep the old data in Files first.",
          "Starting fresh sets that data aside on this device; nothing is deleted. Then set up again, or restore a backup you saved from the earlier version.",
        ],
      },
      {
        id: "problems",
        title: "If restore cannot continue",
        paragraphs: [
          "For an invalid or unsupported file, keep the original backup and contact support with the error text.",
          "The free plan restores a backup with one workplace or up to five active clients; a larger backup needs Plus.",
          "If the app cannot open, keep the installation and your backup files. Do not uninstall or reset it as a first step: local data may be lost. Contact support before taking destructive action.",
        ],
      },
    ],
  },
  {
    slug: "performance-reports",
    title: "Local performance reports",
    description: "An optional summary of crashes and resource use that stays on your device until you share it.",
    sections: [
      {
        id: "off",
        screens: ["performance-reports"],
        title: "Off unless you choose it",
        paragraphs: [
          "RosterEase can keep a small summary from Apple’s MetricKit to help investigate crashes, hangs and resource use. It is off unless you turn it on during setup or in Settings > About > Local performance reports. Declining changes nothing else, and nothing is uploaded automatically.",
        ],
      },
      {
        id: "kept",
        title: "What is kept",
        paragraphs: [
          "Kept: report intervals, CPU time, peak memory and disk writes; counts of crashes, hangs, CPU exceptions and disk-write exceptions; and the app version, build and iOS version when each report arrived.",
          "Not kept: raw reports or stack traces, names, roster or client records, notes, locations, file paths, account IDs, keys or device identifiers.",
          "Only reports covering time after you turned this on are accepted. Delivery is best-effort: metrics usually arrive at most daily, and a crash report needs a later launch.",
        ],
      },
      {
        id: "limits",
        title: "Limits and deleting",
        paragraphs: [
          "Up to 7 days, 20 reports and 10 MiB are kept, oldest removed first. Expired reports are removed the next time the app runs, not while it is closed. Reports are excluded from backups.",
          "Turning the option off stops collection and deletes the reports. If deletion fails, the app tells you and lets you retry. It can’t remove Apple’s own diagnostics or copies you’ve shared.",
        ],
      },
      {
        id: "sharing",
        title: "Sharing is your choice",
        paragraphs: [],
        steps: [
          "Tap Unlock and review JSON and authenticate with Face ID, Touch ID or your passcode.",
          "Read the exact file shown.",
          "Tap Share reviewed JSON and choose where it goes. RosterEase can’t delete copies you’ve shared.",
        ],
      },
    ],
  },
];
