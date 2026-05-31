import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { Settings } from '../domain/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  settings = new Settings()
  isLoading = new BehaviorSubject<boolean>(false)
  isLoading$ = this.isLoading.asObservable()
  message = ""

  constructor(private data: DataService) {}

  ngOnInit() {
    this.loadSettings()
  }

  loadSettings() {
    this.isLoading.next(true)
    this.data.getSettings((result: Settings) => {
      this.settings.columnOffsets = result.columnOffsets || new Settings().columnOffsets
      this.isLoading.next(false)
    })
  }

  save() {
    this.message = ""
    this.isLoading.next(true)
    this.data.saveSettings(this.settings, (result: Settings) => {
      this.settings.columnOffsets = result.columnOffsets || new Settings().columnOffsets
      this.message = "Settings saved"
      this.isLoading.next(false)
    })
  }
}
