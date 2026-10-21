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
  documentId = ""

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

  formatDocumentFields(fields: Array<{ field: string, value: unknown }> = []) {
    return fields.map((entry) => `${entry.field}: ${JSON.stringify(entry.value)}`).join('\n')
  }

  deleteDocumentById() {
    const documentId = this.documentId?.trim()
    if (!documentId) {
      this.message = 'Registry not found'
      return
    }

    this.isLoading.next(true)
    this.data.getDocumentById(documentId, (result: any) => {
      this.isLoading.next(false)

      if (!result || !result.found || result.message === 'Registry not found') {
        this.message = 'Registry not found'
        return
      }

      const fieldList = this.formatDocumentFields(result.fields || [])
      const confirmed = window.confirm(`Delete this document?\n\n${fieldList}`)
      if (!confirmed) {
        this.message = 'Deletion cancelled'
        return
      }

      this.isLoading.next(true)
      this.data.deleteDocumentById(documentId, (deleteResult: any) => {
        this.isLoading.next(false)

        if (!deleteResult || deleteResult.message === 'Registry not found') {
          this.message = 'Registry not found'
          return
        }

        this.message = 'Document deleted successfully'
        this.documentId = ''
      })
    })
  }
}
