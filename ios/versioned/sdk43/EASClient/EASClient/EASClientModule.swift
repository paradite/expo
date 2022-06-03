// Copyright 2015-present 650 Industries. All rights reserved.

import ABI43_0_0ExpoModulesCore

public class EASClientModule: Module {
  public func definition() -> ModuleDefinition {
    name("EASClient")

    constants {
      return [
        "clientID": EASClientID.uuid().uuidString
      ]
    }
  }
}
