---
title: Build server infrastructure
sidebar_title: Server infrastructure
---

import { Collapsible } from '~/ui/components/Collapsible';

This document describes the current build infrastructure as of May 13, 2022. It is likely to change over time, and this document will be updated.

## Configuring build environment

Images for each platform have one specific version of Node, yarn, CocoaPods, Xcode, Ruby, Fastlane, and so on. You can override some of the versions in [eas.json](../build/eas-json). If there's no dedicated configuration option you're looking for, you can use [npm hooks](how-tos/#eas-build-specific-npm-hooks) to install or update any system dependencies with `apt-get` or `brew`. Please take into account that those customizations are applied during the build and will increase your build times.

When selecting an image for the build you can use the full name provided below or one of the aliases: `default`, `latest`.

- The use of a specific name guarantees the consistent environment with only minor updates.
- `default` alias will be assigned to the environment that most closely resembles the configuration used for Expo SDK development.
- `latest` alias will be assigned to the image with the most up to date versions of the software.

> **Note:**
>
> If you do not provide `image` in **eas.json**, your build will use `default` image. However, in some cases, we select a more appropriate image based on the Expo SDK version or React Native version. You can check what image is used for a build in the "Spin up build environment" build logs section.

## Android build server configurations

- Android workers run on Kubernetes in an isolated environment
  - Every build gets its own container running on a dedicated Kubernetes node
  - Build resources: 4 CPU, 12 GB RAM
- NPM cache deployed with Kubernetes. [Learn more](caching/#javascript-dependencies)
- Maven cache deployed with Kubernetes. [Learn more](caching/#android-dependencies)
- Global Gradle configuration in `~/.gradle/gradle.properties`:

  ```ini
  org.gradle.jvmargs=-Xmx14g -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
  org.gradle.parallel=true
  org.gradle.configureondemand=true
  org.gradle.daemon=false
  ```

- `~/.npmrc`

  ```ini
  registry=http://npm-cache-service.worker-infra-production.svc.cluster.local:4873
  ```

- `~/.yarnrc.yml`

  ```yml
  unsafeHttpWhitelist:
    - "*"
  npmRegistryServer: "http://npm-cache-service.worker-infra-production.svc.cluster.local:4873"
  enableImmutableInstalls: false
  ```

#### Image `ubuntu-20.04-jdk-11-ndk-r21e` (alias `latest`)

<Collapsible summary="Details">

- Docker image: `ubuntu:focal-20210921`
- NDK 21.4.7075529
- Node.js 16.13.2
- Yarn 1.22.17
- npm 8.1.2
- Java 11

</Collapsible>

#### Image `ubuntu-20.04-jdk-8-ndk-r21e`

<Collapsible summary="Details">

- Docker image: `ubuntu:focal-20210921`
- NDK 21.4.7075529
- Node.js 16.13.2
- Yarn 1.22.17
- npm 8.1.2
- Java 8

</Collapsible>

#### Image `ubuntu-18.04-jdk-11-ndk-r19c`

<Collapsible summary="Details">

- Docker image: `ubuntu:bionic-20210930`
- NDK 19.2.5345600
- Node.js 16.13.2
- Yarn 1.22.17
- npm 8.1.2
- Java 11

</Collapsible>

#### Image `ubuntu-18.04-jdk-8-ndk-r19c` (alias `default`)

<Collapsible summary="Details">

- Docker image: `ubuntu:bionic-20210930`
- NDK 19.2.5345600
- Node.js 16.13.2
- Yarn 1.22.17
- npm 8.1.2
- Java 8

</Collapsible>

## iOS build server configurations

- iOS worker VMs run on Mac Mini 8.1 hosts in an isolated environment
  - Every build gets its own fresh macOS VM
  - Hardware: Intel(R) Core(TM) i7-8700B CPU (6 cores/12 threads), 64 GB RAM
  - Build resource limits: 3 cores, 12 GB RAM
- npm cache. [Learn more](caching/#javascript-dependencies)
- `~/.npmrc`

  ```ini
  registry=http://10.254.24.8:4873
  ```

- `~/.yarnrc.yml`

  ```yml
  unsafeHttpWhitelist:
    - "*"
  npmRegistryServer: "registry=http://10.254.24.8:4873"
  enableImmutableInstalls: false
  ```

#### Image `macos-monterey-12.4-xcode-13.4` (alias `latest`)

<Collapsible summary="Details">

- macOS Monterey 12.4
- Xcode 13.4 (13F17a)
- Node.js 16.13.2
- Yarn 1.22.17
- pnpm 7.0.0
- npm 8.1.2
- fastlane 2.205.2
- CocoaPods 1.11.3
- Ruby 2.7

</Collapsible>

#### Image `macos-monterey-12.3-xcode-13.3` (alias `default`)

<Collapsible summary="Details">

- macOS Monterey 12.3.1
- Xcode 13.3.1 (13E500a)
- Node.js 16.13.2
- Yarn 1.22.17
- pnpm 7.0.0
- npm 8.1.2
- fastlane 2.205.2
- CocoaPods 1.11.3
- Ruby 2.7

</Collapsible>

#### Image `macos-monterey-12.1-xcode-13.2`

<Collapsible summary="Details">

- macOS Monterey 12.1
- Xcode 13.2.1 (13C100)
- Node.js 16.13.2
- Yarn 1.22.17
- pnpm 7.0.0
- npm 8.1.2
- fastlane 2.201.0
- CocoaPods 1.11.2
- Ruby 2.7

</Collapsible>

#### Image `macos-big-sur-11.4-xcode-13.0`

<Collapsible summary="Details">

- macOS Big Sur 11.4
- Xcode 13.0 (13A233)
- Node.js 16.13.2
- Yarn 1.22.17
- pnpm 7.0.0
- npm 8.1.2
- fastlane 2.185.1
- CocoaPods 1.10.1
- Ruby 2.7

</Collapsible>

#### Image `macos-big-sur-11.4-xcode-12.5`

<Collapsible summary="Details">

- macOS Big Sur 11.4
- Xcode 12.5 (12E5244e)
- Node.js 16.13.2
- Yarn 1.22.17
- pnpm 7.0.0
- npm 8.1.2
- fastlane 2.185.1
- CocoaPods 1.10.1
- Ruby 2.7

</Collapsible>
