import {app} from 'electron'
import path from 'path'
import os from 'os'

function appPath () {
  // For testing when running manually via npm start
  // return '/Applications/Keybase.app/Contents/Resources/app/'
  // For testing running from DMG
  // return '/Volumes/Keybase/Keybase.app/Contents/Resources/app/'
  return app.getAppPath()
}

// Path to bundle directory, e.g. /Applications/Keybase.app (darwin only)
export function appBundlePath () {
  if (os.platform() !== 'darwin') return null
  return path.resolve(appPath(), '..', '..', '..')
}

// Path to resources directory (darwin only), null if not available
export function appResourcesPath () {
  if (os.platform() !== 'darwin') return null
  return path.resolve(appPath(), '..')
}

// Path to installer executable (darwin only), null if not available
export function appInstallerPath () {
  if (os.platform() !== 'darwin') return null
  const resourcesPath = appResourcesPath()
  if (resourcesPath === null) return null
  return path.resolve(resourcesPath, 'KeybaseInstaller.app', 'Contents', 'MacOS', 'Keybase')
}

// Path to keybase executable (darwin only), null if not available
export function keybaseBinPath () {
  if (os.platform() !== 'darwin') return null
  const bundlePath = appBundlePath()
  if (bundlePath === null) return null
  return path.resolve(bundlePath, 'Contents', 'SharedSupport', 'bin', 'keybase')
}

// pathToURL takes path and converts to (file://) url.
// See https://github.com/sindresorhus/file-url
export function pathToURL (path) {
  path = path.replace(/\\/g, '/')

  // Windows drive letter must be prefixed with a slash
  if (path[0] !== '/') {
    path = '/' + path
  }

  return encodeURI('file://' + path).replace(/#/g, '%23')
}
