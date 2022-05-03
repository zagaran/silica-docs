# Widgets

## SilicaRenderer
If you wish to define a custom renderer, subclass the `SilicaRenderer` widget and define the `custom_component_name` class
variable. That's it! Make sure that you also subclass the type of widget whose display options (e.g. Textarea) and/or
validation (e.g. DecimalInput) you wish to copy.