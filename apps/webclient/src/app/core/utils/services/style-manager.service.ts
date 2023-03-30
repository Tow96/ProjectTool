import { Injectable } from '@angular/core';

@Injectable()
export class StyleManagerService {
  setDarkTheme(active: boolean) {
    if (active) {
      this.removeStyle('light-theme');
      document.body.classList.remove('light-theme');
    } else {
      const href = 'light-theme.css';
      this.getLinkElementForKey('light-theme').setAttribute('href', href);
      document.body.classList.add('light-theme');
    }
  }

  private removeStyle(key: string) {
    const existingLinkElement = this.getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }
  private getLinkElementForKey(key: string) {
    return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
  }

  private getExistingLinkElementByKey(key: string) {
    return document.head.querySelector(`link[rel="stylesheet"].${this.getClassNameForKey(key)}`);
  }

  private createLinkElementWithKey(key: string) {
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(this.getClassNameForKey(key));
    document.head.appendChild(linkEl);
    return linkEl;
  }

  private getClassNameForKey(key: string) {
    return `style-manager-${key}`;
  }
}
