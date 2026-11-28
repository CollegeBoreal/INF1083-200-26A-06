import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'ca.collegeboreal.b300160733.animations',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;
