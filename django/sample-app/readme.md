# Django-Vue Sample Project


## Installation

### Django

1. `pip install -r requirements.txt`
2. `python manage.py migrate`
3. `python manage.py runserver`

### Vue

1. `yarn install`
2. `yarn dev`

## Development
It is recommended to keep a node server running in dev mode while you make changes to your app; this way, any changes you
make to your Vue code will be displayed in Django on the next page reload, which should prevent a de-sync between your
code and the behavior you see in local testing. Note that this example assumes you are not committing the compiled
JS to your repo, and that instead you have `yarn build` as part of your deployment process. If you wish instead to manually
build and commit your Vue library, you should ensure that you clear the `/static/vue/dist` folder before doing so, as hot-reloading
can cause a buildup of unused files.

Do all Vue development in `/src`. If you correctly define components in the library, you will have access to them
throughout the codebase. Do keep in mind that you will have to create a new Vue component in your browser when you wish
to use Vue components or directives.