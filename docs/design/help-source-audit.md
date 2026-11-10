# Help guide source audit

Checked on 5 September 2026 against the app worktree at base `63697d3` plus its in-progress review changes. The app-review task confirmed these corrections. This does not establish that a historical TestFlight build has the same interface.

| Guide | Verified behaviour and correction | App source |
| --- | --- | --- |
| Getting started | Shift Worker manages repeating rotations. Field Worker manages clients, work days and ordered visits. Per-client Visit Days are conditional on the installed build because this is newer than TestFlight 92. | `Sources/Features/Settings/SettingsView.swift`, app-review handoff |
| Smart Import | Review extracted data before applying. Shift imports create repeating patterns; split shifts and multiple workplaces in one source are unsupported. Client visit-day handling is qualified by build. No handwriting accuracy promise. | `Sources/Services/RosterImportService.swift`, `Sources/Services/FieldImportService.swift` |
| Calendar and privacy | Calendar Sync appears only in Shift Worker. Select a workplace. Include Shift Notes is the actual opt-in label. Field Worker does not have the Calendar Sync destination. | `Sources/Features/Settings/SettingsView.swift:383`, `:1451`, `:1482` |
| Calendar and privacy | Actual settings destinations are Travel Defaults and Privacy & Display. Privacy lock replaces widget details with private placeholders. | `Sources/Features/Settings/SettingsView.swift:966`, `:974`, `:1588` |
| Backup and restore | Open Settings > Data Management > Backups. Enter Backup passphrase and Confirm passphrase before tapping Export Backup. At least 8 characters are required. Restore Backup is in the same section. | `Sources/Features/Settings/BackupManagementCard.swift:91`, `:195` |
| Backup and restore | Restore replaces current app data. Preserve a separate backup before replacement. Multiple Shift workplaces require Plus capacity. | `Sources/Shared/BackupRestoreAction.swift`, `Sources/Services/BackupService.swift`, `Sources/Services/FeatureAccessPolicy.swift` |

Public guides preserve exact feature names, the encryption/passphrase limitation, local-data recovery precautions and optional-sharing boundaries. The approved Privacy Policy and Terms of Use were not rewritten as part of editorial cleanup.

Before a release, compare these routes to the candidate build. A source audit cannot verify system permission prompts, purchases, file-provider behaviour or every live navigation path on a device.

## Step labels, 7 November 2026

Checked against the app at `a64effc8` (TestFlight 1.1 build 41) and its help recordings. Bold labels in guide steps match these strings.

| Guide steps | Labels | App source |
| --- | --- | --- |
| Change one day, add a split or double shift | Change Just This Day, Save change, Remove change, Add Another Shift, Add a Shift, Add shift | `Sources/Features/Calendar/CalendarScreenView.swift`, `Sources/Shared/ShiftExceptionEditor.swift`, `change-one-day` recording |
| Record an absence | Not working today, Sick day, Save, Undo; the card also swipes | `Sources/Features/Today/TodayView.swift`, `record-an-absence` recording |
| Start an import | Import roster, Import clients, Paste text, File or PDF, Photo, Scan document, Analyze roster, Analyze visits | `Sources/Features/Import/SmartImportView.swift`, `Sources/Features/Workplaces/ClientsView.swift`, `import-review` recording |
| Save and restore a backup | Data Management, Save backup…, Backup Saved, Restore backup | `Sources/Features/Settings/BackupManagementCard.swift`, `save-a-backup` recording |
| Check in and out | Notes & Templates, Shift check-ins | `Sources/Features/Notes/NoteCaptureSettingsCard.swift`, `Sources/Features/Settings/SettingsView.swift` |
| Travel, Calendar Sync, privacy lock | Travel Buffer, Start Location, Sync workplace shifts, Require Unlock, Ask Again | `SettingsTravelPage.swift`, `SettingsCalendarSyncPage.swift`, `SettingsPrivacyPage.swift` |
| Live Activities, Siri, Plus, performance reports | Show Live Activities, Open iOS Settings, Allow Siri roster answers, See Plus Plans, Restore purchases, Local performance reports, Keep local performance reports | `LiveActivitiesSetupView.swift`, `SiriSetupView.swift`, `SettingsPlusPage.swift`, `SettingsAboutPage.swift`, `LocalMetricDiagnosticsView.swift` |

## 1.1 pre-release R6, 10 November 2026

Checked against app source `e292067267e0a62ebd6f575a8223f6293b7da6d2` and website branch `help-1.1` at `07720371d7126b9fb964a2bfbb27c17395f8bc5b`, plus the R6 corrections. The September and 7 November sections above are historical, not current instructions where the app has changed.

| Claim | Current behaviour and correction | App source |
| --- | --- | --- |
| Help URLs | Keep the 16 existing slugs. The app also opens `/help` and `/privacy`. The branch generates all 16 articles; the live domain still returned 404 for twelve during this check. Local presence is not deployment. | `Sources/Shared/HelpArticleLink.swift`, `Sources/Features/Settings/SettingsAboutPage.swift` |
| Weekly backups | Opt-in, free, chosen folder; tries when due on foreground and requests background refresh. iOS controls actual timing. Settings shows Last Backup, Back up now and Choose folder on folder failure. No exact retry time is promised: R5 is fixing first-backup background retry separately. | `Sources/Features/Settings/AutomaticBackupCard.swift`, `Sources/Services/AutomaticBackup.swift`, `Sources/Services/AutomaticBackupPolicy.swift` |
| Retention | Four automatic files; a new backup is verified before older automatic files are pruned. Manual exports are untouched; switching off leaves saved files. An empty roster is not backed up. | `AutomaticBackupFolder.write`, `AutomaticBackupController.run`, `AutomaticBackupRetention` |
| Keys | New manual/weekly backups use a generated Keychain key, synchronizable with iCloud Keychain. Restore tries saved keys before asking. Older files need their original key or passphrase, not necessarily the key displayed now. Reveal requires device-owner authentication. | `AutomaticBackupPassphraseStore`, `Sources/Shared/BackupRestoreAction.swift`, `Sources/Features/Settings/BackupKeyView.swift` |
| Backup contents and replacement | Include records, note history, photos, recordings and backed-up preferences. Privacy lock, automatic backup setup and local performance reports stay device-local and are not restored from the file. Restore replaces records and backed-up preferences and reconciles Calendar Sync. | `Sources/Services/BackupService.swift`, `PrivacyLockPolicy.swift`, `AutomaticBackup.swift`, `LocalMetricDiagnosticsStore.swift` |
| 1.0 recovery | Recognised 1.0 store: Bring your data to this version → Continue → Bring Back Your Data → Bring back 1.0 data. Save a copy exports raw store files, not a restorable backup file. An exported 1.0 backup still restores with its original passphrase in the Backup key prompt. Reset/uninstall can remove the set-aside store. Removed the historical recovery screenshot rather than showing obsolete controls beside current instructions. | `Sources/App/RosterEaseApp.swift`, `Sources/Features/Onboarding/OnboardingFlowView.swift`, `OnboardingSteps.swift`, `Sources/Services/EarlierStoreImport.swift`, `BackupManagementCard.swift` |
| Privacy lock | Device passcode required; without it Require Unlock does not protect the app. Outside-surface choices are independent, with separate notification/widget system settings. Support both iPhone and iPad terminology. | `Sources/Features/Settings/SettingsPrivacyPage.swift`, `Sources/Services/PrivacyLockSettings.swift`, `PrivacyLockPolicy.swift` |
| Live Activities | System settings action now says Turn on in iOS Settings. Live updates have an eight-hour system limit; reopening can renew a long shift's activity. | `Sources/Features/Guidance/LiveActivitiesSetupView.swift`, `Sources/Services/RosterLiveActivityService.swift`, `WidgetShared/RosterDayProgressSnapshot.swift` |

The privacy policy now describes best-effort scheduled exports, attachment contents, generated and legacy keys, device-local exclusions and chosen storage providers. This corrects the live policy's obsolete claim that exports never run automatically or in the background.

The release checklist previously said to wait until the app was released before merging the website. R6 requires working public help before public 1.1 release. The owner approved committing and pushing these fixes, then directed that they stay on `help-1.1` while 1.1 awaits App Store approval ([approval and follow-ups](https://ampcode.com/threads/T-01a1c394-2073-77e0-a822-66a0ad27f179)). Do not merge or deploy without new approval; merging to `main` triggers deployment automatically. After publication, repeat HTTP and content checks against the production domain before clearing R6.

This is a source and website check, not a native-device reproduction of restore, permissions, background scheduling or Keychain synchronization. No app build, archive, upload or submission is needed for these website-only corrections.
