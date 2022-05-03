# Silica Documentation

This repository is a central hub of technical information about the usage and implementation of the Silica libraries.
For interactive examples of each library in action, you should visit the sample application for each library.


## What is Silica?

Silica is an interface between the excellent open-source library [JsonForms.io](https://jsonforms.io) and various statically
rendered backend technologies. The intention is to help developers write less code when they need to write dynamic forms,
while leveraging the extraordinary amount of work which has already gone into creating and handling forms.

Silica is not just a skin on top of JsonForms; our libraries implement custom renderers which might not make sense in
the land of Single-Page Apps (e.g. allowing fields to be hidden), but which are essential for use in most statically
rendered web frameworks (e.g. Django).

## Supported Frameworks

### Backend
Currently, there is only a Django implementation of the Silica framework. See technical details [here](/django/readme.md) and the sample project [here](/django/sample-app).

### Frontend
Currently, there is only a Vue2 implementation of the Silica framework. See technical details [here](/vue2/readme.md) and the sample project [here](/vue2/sample-app).

We intend to implement a Vue3 and React version of the framework once the Vue2 implementation is in a stable state.

## Roadmap
Silica is currently in active development; see our GitHub Issues tracker to see what is currently in development.
Our major priority at the moment is stability, as the library is still in pre-alpha.

### Tags
Where appropriate, components have been tagged with the following badges.

#### In-Progress <img src="https://img.shields.io/static/v1?label=status&message=in-progress&color=red"/>
Anything tagged `in-progress` is not stable and should not be used for production sites. These components are in
active development and their API may change. Use at your own risk.


#### Stable <img src="https://img.shields.io/static/v1?label=status&message=in-progress&color=yellow"/>
Anything tagged `stable` has a settled API but may not be feature complete. These should generally not be used
for production sites, although you could safely build in support for them without wasting effort.

#### Completed <img src="https://img.shields.io/static/v1?label=status&message=stable&color=green"/>
Anything tagged `completed` should be considered stable. Its API will not change between minor versions and it is 
feature complete. You can feel comfortable using these components in production settings.
