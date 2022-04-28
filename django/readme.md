# Silica-Django
Silica-Django is the backend implementation of the Silica interface. It is designed to fit as seamlessly as possible into
existing Django projects. On its own, `silica-django` does not implement any frontend rendering to handle the generated data;
rather, it is entirely concerned with the translation of backend data to a format which can be easily read by a companion
frontend library -- and, upon submission, the parsing of that data back into a format which Django can understand and process.

For an example of this library in use with a Vue 2 implementation of the frontend, see [the sample project](https://www.github.com/zagaran/silica-docs/django/sample-app).