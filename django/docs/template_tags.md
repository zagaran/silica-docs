# Template Tags

## load_silica_form
We provide a utility template tag `load_silica_form` which takes in a Silica-enabled Django Form `form` and a string 
`form_id`. This template tag loads the necessary data to the page using the `json_script` Django template tag, which in
turn a correctly configured frontend component library will pick up and use to render the form. You must use this
template tag (or otherwise accomplish its function) on every page where you wish to use Silica forms, as this is where 
the information for how to render the form gets passed to the frontend.