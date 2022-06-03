import ABI45_0_0ExpoModulesTestCore

@testable import ABI45_0_0ExpoModulesCore

class ConstantsSpec: ExpoSpec {
  override func spec() {
    let appContext = AppContext()

    it("takes closure resolving to dictionary") {
      let holder = mockModuleHolder(appContext) {
        constants {
          return ["test": 123]
        }
      }
      expect(holder.getConstants()["test"] as? Int) == 123
    }

    it("takes the dictionary") {
      let holder = mockModuleHolder(appContext) {
        constants(["test": 123])
      }
      expect(holder.getConstants()["test"] as? Int) == 123
    }

    it("merges multiple constants definitions") {
      let holder = mockModuleHolder(appContext) {
        constants(["test": 456, "test2": 789])
        constants(["test": 123])
      }
      let consts = holder.getConstants()
      expect(consts["test"] as? Int) == 123
      expect(consts["test2"] as? Int) == 789
    }
  }
}
