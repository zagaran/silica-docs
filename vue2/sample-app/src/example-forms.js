export const formTypes = [
    {
        name: "Simple Form",
        schema: {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "minLength": 3,
                    "description": "Please enter your name"
                },
                "vegetarian": {
                    "type": "boolean"
                },
                "birthDate": {
                    "type": "string",
                    "format": "date"
                },
                "nationality": {
                    "type": "string",
                    "enum": [
                        "DE",
                        "IT",
                        "JP",
                        "US",
                        "RU",
                        "Other"
                    ]
                },
                "personalData": {
                    "type": "object",
                    "properties": {
                        "age": {
                            "type": "integer",
                            "description": "Please enter your age."
                        },
                        "height": {
                            "type": "number"
                        },
                        "drivingSkill": {
                            "type": "number",
                            "maximum": 10,
                            "minimum": 1,
                            "default": 7
                        }
                    },
                    "required": [
                        "age",
                        "height"
                    ]
                },
                "occupation": {
                    "type": "string"
                },
                "postalCode": {
                    "type": "string",
                    "maxLength": 5
                }
            },
            "required": [
                "occupation",
                "nationality"
            ]
        },
        uischema: {
            "type": "VerticalLayout",
            "elements": [
                {
                    "type": "HorizontalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/name"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/personalData/properties/age"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/birthDate"
                        }
                    ]
                },
                {
                    "type": "Label",
                    "text": "Additional Information"
                },
                {
                    "type": "HorizontalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/personalData/properties/height"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/nationality"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/occupation",
                            "suggestion": [
                                "Accountant",
                                "Engineer",
                                "Freelancer",
                                "Journalism",
                                "Physician",
                                "Student",
                                "Teacher",
                                "Other"
                            ]
                        }
                    ]
                }
            ]
        },
        data: {
            "name": "John Doe",
            "vegetarian": false,
            "birthDate": "1985-06-02",
            "personalData": {
                "age": 34
            },
            "postalCode": "12345"
        }
    },
    {
        name: "Controls",
        schema: {
            "type": "object",
            "properties": {
                "string": {
                    "type": "string"
                },
                "boolean": {
                    "type": "boolean"
                },
                "number": {
                    "type": "number"
                },
                "integer": {
                    "type": "integer"
                },
                "date": {
                    "type": "string",
                    "format": "date"
                },
                "time": {
                    "type": "string",
                    "format": "time"
                },
                "dateTime": {
                    "type": "string",
                    "format": "date-time"
                },
                "enum": {
                    "type": "string",
                    "enum": [
                        "One",
                        "Two",
                        "Three"
                    ]
                }
            }
        },
        uischema: {
            "type": "VerticalLayout",
            "elements": [
                {
                    "type": "Control",
                    "scope": "#/properties/string"
                },
                {
                    "type": "Control",
                    "scope": "#/properties/boolean"
                },
                {
                    "type": "Control",
                    "scope": "#/properties/number"
                },
                {
                    "type": "Control",
                    "scope": "#/properties/integer"
                },
                {
                    "type": "Control",
                    "scope": "#/properties/date"
                },
                {
                    "type": "Control",
                    "scope": "#/properties/time"
                },
                {
                    "type": "Control",
                    "scope": "#/properties/dateTime"
                },
                {
                    "type": "Control",
                    "scope": "#/properties/enum"
                }
            ]
        },
        data: {
            "string": "This is a string",
            "boolean": true,
            "number": 50.5,
            "integer": 50,
            "date": "2020-06-25",
            "time": "23:08:00",
            "dateTime": "2020-06-25T23:08:42+02:00",
            "enum": "Two"
        },
    },
    {
        name: "Control Options",
        schema: {
            "type": "object",
            "properties": {
                "multilineString": {
                    "type": "string",
                    "description": "Multiline Example"
                },
                "slider": {
                    "type": "number",
                    "minimum": 1,
                    "maximum": 5,
                    "default": 2,
                    "description": "Slider Example"
                },
                "trimText": {
                    "type": "string",
                    "description": "Trim indicates whether the control shall grab the full width available"
                },
                "restrictText": {
                    "type": "string",
                    "maxLength": 5,
                    "description": "Restricts the input length to the set value (in this case: 5)"
                },
                "unfocusedDescription": {
                    "type": "string",
                    "description": "This description is shown even when the control is not focused"
                },
                "hideRequiredAsterisk": {
                    "type": "string",
                    "description": "Hides the \"*\" symbol, when the field is required"
                },
                "toggle": {
                    "type": "boolean",
                    "description": "The \"toggle\" option renders boolean values as a toggle."
                }
            },
            "required": [
                "hideRequiredAsterisk",
                "restrictText"
            ]
        },
        uischema: {
            "type": "VerticalLayout",
            "elements": [
                {
                    "type": "Control",
                    "scope": "#/properties/multilineString",
                    "options": {
                        "multi": true
                    }
                },
                {
                    "type": "Control",
                    "scope": "#/properties/slider",
                    "options": {
                        "slider": true
                    }
                },
                {
                    "type": "Control",
                    "scope": "#/properties/trimText",
                    "options": {
                        "trim": true
                    }
                },
                {
                    "type": "Control",
                    "scope": "#/properties/restrictText",
                    "options": {
                        "restrict": true
                    }
                },
                {
                    "type": "Control",
                    "scope": "#/properties/unfocusedDescription",
                    "options": {
                        "showUnfocusedDescription": true
                    }
                },
                {
                    "type": "Control",
                    "scope": "#/properties/hideRequiredAsterisk",
                    "options": {
                        "hideRequiredAsterisk": true
                    }
                },
                {
                    "type": "Control",
                    "scope": "#/properties/toggle",
                    "label": "Boolean as Toggle",
                    "options": {
                        "toggle": true,
                        "readOnly": true,
                    }
                }
            ]
        },
        data: {
            "multilineString": "Multi-\nline\nexample",
            "slider": 4,
            "trimText": "abcdefg",
            "restrictText": "abcde",
            "toggle": false
        },
    },
    {
        name: "Categories",
        schema: {
            "type": "object",
            "properties": {
                "firstName": {
                    "type": "string",
                    "minLength": 3,
                    "description": "Please enter your first name"
                },
                "secondName": {
                    "type": "string",
                    "minLength": 3,
                    "description": "Please enter your second name"
                },
                "vegetarian": {
                    "type": "boolean"
                },
                "birthDate": {
                    "type": "string",
                    "format": "date",
                    "description": "Please enter your birth date."
                },
                "nationality": {
                    "type": "string",
                    "enum": [
                        "DE",
                        "IT",
                        "JP",
                        "US",
                        "RU",
                        "Other"
                    ]
                },
                "provideAddress": {
                    "type": "boolean"
                },
                "address": {
                    "type": "object",
                    "properties": {
                        "street": {
                            "type": "string"
                        },
                        "streetNumber": {
                            "type": "string"
                        },
                        "city": {
                            "type": "string"
                        },
                        "postalCode": {
                            "type": "string",
                            "maxLength": 5
                        }
                    }
                },
                "vegetarianOptions": {
                    "type": "object",
                    "properties": {
                        "vegan": {
                            "type": "boolean"
                        },
                        "favoriteVegetable": {
                            "type": "string",
                            "enum": [
                                "Tomato",
                                "Potato",
                                "Salad",
                                "Aubergine",
                                "Cucumber",
                                "Other"
                            ]
                        },
                        "otherFavoriteVegetable": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        uischema: {
            "type": "Categorization",
            "elements": [
                {
                    "type": "Category",
                    "label": "Basic Information",
                    "elements": [
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/firstName"
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/secondName"
                                }
                            ]
                        },
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/birthDate"
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/nationality"
                                }
                            ]
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/provideAddress"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/vegetarian"
                        }
                    ]
                },
                {
                    "type": "Category",
                    "label": "Address",
                    "elements": [
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/address/properties/street"
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/address/properties/streetNumber"
                                }
                            ]
                        },
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/address/properties/city"
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/address/properties/postalCode"
                                }
                            ]
                        }
                    ],
                    "rule": {
                        "effect": "SHOW",
                        "condition": {
                            "scope": "#/properties/provideAddress",
                            "schema": {
                                "const": true
                            }
                        }
                    }
                },
                {
                    "type": "Category",
                    "label": "Additional",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/vegetarianOptions/properties/vegan"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/vegetarianOptions/properties/favoriteVegetable"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/vegetarianOptions/properties/otherFavoriteVegetable",
                            "rule": {
                                "effect": "SHOW",
                                "condition": {
                                    "scope": "#/properties/vegetarianOptions/properties/favoriteVegetable",
                                    "schema": {
                                        "const": "Other"
                                    }
                                }
                            }
                        }
                    ],
                    "rule": {
                        "effect": "SHOW",
                        "condition": {
                            "scope": "#/properties/vegetarian",
                            "schema": {
                                "const": true
                            }
                        }
                    }
                }
            ]
        },
        data: {
            "provideAddress": true,
            "vegetarian": false
        },
    },
    {
        name: "Categorization Stepper",
        schema: {
            "type": "object",
            "properties": {
                "firstName": {
                    "type": "string",
                    "minLength": 3,
                    "description": "Please enter your first name"
                },
                "secondName": {
                    "type": "string",
                    "minLength": 3,
                    "description": "Please enter your second name"
                },
                "vegetarian": {
                    "type": "boolean"
                },
                "birthDate": {
                    "type": "string",
                    "format": "date",
                    "description": "Please enter your birth date."
                },
                "nationality": {
                    "type": "string",
                    "enum": [
                        "DE",
                        "IT",
                        "JP",
                        "US",
                        "RU",
                        "Other"
                    ]
                },
                "provideAddress": {
                    "type": "boolean"
                },
                "address": {
                    "type": "object",
                    "properties": {
                        "street": {
                            "type": "string"
                        },
                        "streetNumber": {
                            "type": "string"
                        },
                        "city": {
                            "type": "string"
                        },
                        "postalCode": {
                            "type": "string",
                            "maxLength": 5
                        }
                    }
                },
                "vegetarianOptions": {
                    "type": "object",
                    "properties": {
                        "vegan": {
                            "type": "boolean"
                        },
                        "favoriteVegetable": {
                            "type": "string",
                            "enum": [
                                "Tomato",
                                "Potato",
                                "Salad",
                                "Aubergine",
                                "Cucumber",
                                "Other"
                            ]
                        },
                        "otherFavoriteVegetable": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        uischema: {
            "type": "Categorization",
            "elements": [
                {
                    "type": "Category",
                    "label": "Basic Information",
                    "elements": [
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/firstName"
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/secondName"
                                }
                            ]
                        },
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/birthDate"
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/nationality"
                                }
                            ]
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/provideAddress"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/vegetarian"
                        }
                    ]
                },
                {
                    "type": "Category",
                    "label": "Address",
                    "elements": [
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/address/properties/street"
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/address/properties/streetNumber"
                                }
                            ]
                        },
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/address/properties/city"
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/address/properties/postalCode"
                                }
                            ]
                        }
                    ],
                    "rule": {
                        "effect": "SHOW",
                        "condition": {
                            "scope": "#/properties/provideAddress",
                            "schema": {
                                "const": true
                            }
                        }
                    }
                },
                {
                    "type": "Category",
                    "label": "Additional",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/vegetarianOptions/properties/vegan"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/vegetarianOptions/properties/favoriteVegetable"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/vegetarianOptions/properties/otherFavoriteVegetable",
                            "rule": {
                                "effect": "SHOW",
                                "condition": {
                                    "scope": "#/properties/vegetarianOptions/properties/favoriteVegetable",
                                    "schema": {
                                        "const": "Other"
                                    }
                                }
                            }
                        }
                    ],
                    "rule": {
                        "effect": "SHOW",
                        "condition": {
                            "scope": "#/properties/vegetarian",
                            "schema": {
                                "const": true
                            }
                        }
                    }
                }
            ],
            "options": {
                "variant": "stepper"
            }
        },
        data: {
            "provideAddress": true,
            "vegetarian": false
        },
    },
    {
        name: "Categorization Stepper with Nav Buttons",
        schema: {
            "type": "object",
            "properties": {
                "firstName": {
                    "type": "string",
                    "minLength": 3,
                    "description": "Please enter your first name"
                },
                "secondName": {
                    "type": "string",
                    "minLength": 3,
                    "description": "Please enter your second name"
                },
                "vegetarian": {
                    "type": "boolean"
                },
                "birthDate": {
                    "type": "string",
                    "format": "date",
                    "description": "Please enter your birth date."
                },
                "nationality": {
                    "type": "string",
                    "enum": [
                        "DE",
                        "IT",
                        "JP",
                        "US",
                        "RU",
                        "Other"
                    ]
                },
                "provideAddress": {
                    "type": "boolean"
                },
                "address": {
                    "type": "object",
                    "properties": {
                        "street": {
                            "type": "string"
                        },
                        "streetNumber": {
                            "type": "string"
                        },
                        "city": {
                            "type": "string"
                        },
                        "postalCode": {
                            "type": "string",
                            "maxLength": 5
                        }
                    }
                },
                "vegetarianOptions": {
                    "type": "object",
                    "properties": {
                        "vegan": {
                            "type": "boolean"
                        },
                        "favoriteVegetable": {
                            "type": "string",
                            "enum": [
                                "Tomato",
                                "Potato",
                                "Salad",
                                "Aubergine",
                                "Cucumber",
                                "Other"
                            ]
                        },
                        "otherFavoriteVegetable": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        uischema: {
            "type": "Categorization",
            "elements": [
                {
                    "type": "Category",
                    "label": "Basic Information",
                    "elements": [
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/firstName"
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/secondName"
                                }
                            ]
                        },
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/birthDate"
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/nationality"
                                }
                            ]
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/provideAddress"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/vegetarian"
                        }
                    ]
                },
                {
                    "type": "Category",
                    "label": "Address",
                    "elements": [
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/address/properties/street"
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/address/properties/streetNumber"
                                }
                            ]
                        },
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/address/properties/city"
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/address/properties/postalCode"
                                }
                            ]
                        }
                    ],
                    "rule": {
                        "effect": "SHOW",
                        "condition": {
                            "scope": "#/properties/provideAddress",
                            "schema": {
                                "const": true
                            }
                        }
                    }
                },
                {
                    "type": "Category",
                    "label": "Additional",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/vegetarianOptions/properties/vegan"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/vegetarianOptions/properties/favoriteVegetable"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/vegetarianOptions/properties/otherFavoriteVegetable",
                            "rule": {
                                "effect": "SHOW",
                                "condition": {
                                    "scope": "#/properties/vegetarianOptions/properties/favoriteVegetable",
                                    "schema": {
                                        "const": "Other"
                                    }
                                }
                            }
                        }
                    ],
                    "rule": {
                        "effect": "SHOW",
                        "condition": {
                            "scope": "#/properties/vegetarian",
                            "schema": {
                                "const": true
                            }
                        }
                    }
                }
            ],
            "options": {
                "variant": "stepper",
                "showNavButtons": true
            }
        },
        data: {
            "provideAddress": true,
            "vegetarian": false
        },
    },
    {
        name: "Horizontal Layout Example",
        schema: {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "minLength": 3,
                    "description": "Please enter your name"
                },
                "vegetarian": {
                    "type": "boolean"
                },
                "birthDate": {
                    "type": "string",
                    "format": "date"
                },
                "nationality": {
                    "type": "string",
                    "enum": [
                        "DE",
                        "IT",
                        "JP",
                        "US",
                        "RU",
                        "Other"
                    ]
                },
                "personalData": {
                    "type": "object",
                    "properties": {
                        "age": {
                            "type": "integer",
                            "description": "Please enter your age."
                        },
                        "height": {
                            "type": "number"
                        },
                        "drivingSkill": {
                            "type": "number",
                            "maximum": 10,
                            "minimum": 1,
                            "default": 7
                        }
                    },
                    "required": [
                        "age",
                        "height"
                    ]
                },
                "occupation": {
                    "type": "string"
                },
                "postalCode": {
                    "type": "string",
                    "maxLength": 5
                }
            },
            "required": [
                "occupation",
                "nationality"
            ]
        },
        uischema: {
            "type": "HorizontalLayout",
            "elements": [
                {
                    "type": "Control",
                    "label": "Name",
                    "scope": "#/properties/name"
                },
                {
                    "type": "Control",
                    "label": "Birth Date",
                    "scope": "#/properties/birthDate"
                }
            ]
        },
        data: {
            "name": "John Doe",
            "vegetarian": false,
            "birthDate": "1985-06-02",
            "personalData": {
                "age": 34
            },
            "postalCode": "12345"
        },
    },
    {
        name: "Vertical Layout",
        schema: {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "minLength": 3,
                    "description": "Please enter your name"
                },
                "vegetarian": {
                    "type": "boolean"
                },
                "birthDate": {
                    "type": "string",
                    "format": "date"
                },
                "nationality": {
                    "type": "string",
                    "enum": [
                        "DE",
                        "IT",
                        "JP",
                        "US",
                        "RU",
                        "Other"
                    ]
                },
                "personalData": {
                    "type": "object",
                    "properties": {
                        "age": {
                            "type": "integer",
                            "description": "Please enter your age."
                        },
                        "height": {
                            "type": "number"
                        },
                        "drivingSkill": {
                            "type": "number",
                            "maximum": 10,
                            "minimum": 1,
                            "default": 7
                        }
                    },
                    "required": [
                        "age",
                        "height"
                    ]
                },
                "occupation": {
                    "type": "string"
                },
                "postalCode": {
                    "type": "string",
                    "maxLength": 5
                }
            },
            "required": [
                "occupation",
                "nationality"
            ]
        },
        uischema: {
            "type": "VerticalLayout",
            "elements": [
                {
                    "type": "Control",
                    "label": "Name",
                    "scope": "#/properties/name"
                },
                {
                    "type": "Control",
                    "label": "Birth Date",
                    "scope": "#/properties/birthDate"
                }
            ]
        },
        data: {
            "name": "John Doe",
            "vegetarian": false,
            "birthDate": "1985-06-02",
            "personalData": {
                "age": 34
            },
            "postalCode": "12345"
        },
    },
    {
        name: "Groups",
        schema: {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "minLength": 3,
                    "description": "Please enter your name"
                },
                "vegetarian": {
                    "type": "boolean"
                },
                "birthDate": {
                    "type": "string",
                    "format": "date"
                },
                "nationality": {
                    "type": "string",
                    "enum": [
                        "DE",
                        "IT",
                        "JP",
                        "US",
                        "RU",
                        "Other"
                    ]
                },
                "personalData": {
                    "type": "object",
                    "properties": {
                        "age": {
                            "type": "integer",
                            "description": "Please enter your age."
                        },
                        "height": {
                            "type": "number"
                        },
                        "drivingSkill": {
                            "type": "number",
                            "maximum": 10,
                            "minimum": 1,
                            "default": 7
                        }
                    },
                    "required": [
                        "age",
                        "height"
                    ]
                },
                "occupation": {
                    "type": "string"
                },
                "postalCode": {
                    "type": "string",
                    "maxLength": 5
                }
            },
            "required": [
                "occupation",
                "nationality"
            ]
        },
        uischema: {
            "type": "Group",
            "label": "My Group",
            "elements": [
                {
                    "type": "Control",
                    "label": "Name",
                    "scope": "#/properties/name"
                },
                {
                    "type": "Control",
                    "label": "Birth Date",
                    "scope": "#/properties/birthDate"
                }
            ]
        },
        data: {
            "name": "John Doe",
            "vegetarian": false,
            "birthDate": "1985-06-02",
            "personalData": {
                "age": 34
            },
            "postalCode": "12345"
        }
    },
    {
        name: "Nested Layouts",
        schema: {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "minLength": 3,
                    "description": "Please enter your name"
                },
                "vegetarian": {
                    "type": "boolean"
                },
                "birthDate": {
                    "type": "string",
                    "format": "date"
                },
                "nationality": {
                    "type": "string",
                    "enum": [
                        "DE",
                        "IT",
                        "JP",
                        "US",
                        "RU",
                        "Other"
                    ]
                },
                "personalData": {
                    "type": "object",
                    "properties": {
                        "age": {
                            "type": "integer",
                            "description": "Please enter your age."
                        },
                        "height": {
                            "type": "number"
                        },
                        "drivingSkill": {
                            "type": "number",
                            "maximum": 10,
                            "minimum": 1,
                            "default": 7
                        }
                    },
                    "required": [
                        "age",
                        "height"
                    ]
                },
                "occupation": {
                    "type": "string"
                },
                "postalCode": {
                    "type": "string",
                    "maxLength": 5
                }
            },
            "required": [
                "occupation",
                "nationality"
            ]
        },
        uischema: {
            "type": "Group",
            "label": "My Group",
            "elements": [
                {
                    "type": "HorizontalLayout",
                    "elements": [
                        {
                            "type": "VerticalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "label": "Name",
                                    "scope": "#/properties/name"
                                },
                                {
                                    "type": "Control",
                                    "label": "Birth Date",
                                    "scope": "#/properties/birthDate"
                                }
                            ]
                        },
                        {
                            "type": "VerticalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "label": "Name",
                                    "scope": "#/properties/name"
                                },
                                {
                                    "type": "Control",
                                    "label": "Birth Date",
                                    "scope": "#/properties/birthDate"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        data: {
            "name": "John Doe",
            "vegetarian": false,
            "birthDate": "1985-06-02",
            "personalData": {
                "age": 34
            },
            "postalCode": "12345"
        },
    },
    {
        name: "Array Example",
        schema: {
            "type": "object",
            "properties": {
                "comments": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "date": {
                                "type": "string",
                                "format": "date"
                            },
                            "message": {
                                "type": "string",
                                "maxLength": 5
                            },
                            "enum": {
                                "type": "string",
                                "enum": [
                                    "foo",
                                    "bar"
                                ]
                            }
                        }
                    },
                    "maxItems": 4,
                    "minItems": 1,
                }
            }
        },
        uischema: {
            "type": "VerticalLayout",
            "elements": [
                {
                    "type": "Control",
                    "scope": "#/properties/comments",
                    "options": {
                        "enableAddButton": true
                    }
                }
            ]
        },
        data: {
            "comments": [
                {
                    "date": "2001-09-11",
                    "message": "This is an example message"
                },
                {
                    "date": "2022-04-29",
                    "message": "Get ready for booohay"
                }
            ]
        },
    },
    {
        name: "Rule Example",
        schema: {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "dead": {
                    "type": "boolean"
                },
                "kindOfDead": {
                    "type": "string",
                    "enum": [
                        "Zombie",
                        "Vampire",
                        "Ghoul"
                    ]
                },
                "vegetables": {
                    "type": "boolean"
                },
                "kindOfVegetables": {
                    "type": "string",
                    "enum": [
                        "All",
                        "Some",
                        "Only potatoes"
                    ]
                }
            }
        },
        uischema: {
            "type": "VerticalLayout",
            "elements": [
                {
                    "type": "Control",
                    "label": "Name",
                    "scope": "#/properties/name"
                },
                {
                    "type": "Group",
                    "elements": [
                        {
                            "type": "Control",
                            "label": "Is Dead?",
                            "scope": "#/properties/dead"
                        },
                        {
                            "type": "Control",
                            "label": "Kind of dead",
                            "scope": "#/properties/kindOfDead",
                            "rule": {
                                "effect": "ENABLE",
                                "condition": {
                                    "scope": "#/properties/dead",
                                    "schema": {
                                        "const": true
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "Group",
                    "elements": [
                        {
                            "type": "Control",
                            "label": "Eats vegetables?",
                            "scope": "#/properties/vegetables"
                        },
                        {
                            "type": "Control",
                            "label": "Kind of vegetables",
                            "scope": "#/properties/kindOfVegetables",
                            "rule": {
                                "effect": "HIDE",
                                "condition": {
                                    "scope": "#/properties/vegetables",
                                    "schema": {
                                        "const": false
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        },
        data: {
            "name": "John Doe",
            "dead": false,
            "vegetables": false
        },
    },
    {
        name: "Custom Component",
        schema: {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "minLength": 1
                },
                "description": {
                    "type": "string"
                },
                "done": {
                    "type": "boolean"
                },
                "dueDate": {
                    "type": "string",
                    "format": "date"
                },
                "rating": {
                    "type": "integer",
                    "maximum": 5
                }
            },
            "required": [
                "name"
            ]
        },
        uischema: {
            "type": "VerticalLayout",
            "elements": [
                {
                    "type": "Control",
                    "scope": "#/properties/name"
                },
                {
                    "type": "Control",
                    "label": false,
                    "scope": "#/properties/done"
                },
                {
                    "type": "Control",
                    "scope": "#/properties/description",
                    "options": {
                        "multi": true,
                        "customComponentName": "CustomTextRenderer"
                    }
                },
                {
                    "type": "Control",
                    "scope": "#/properties/dueDate"
                },
                {
                    "type": "Control",
                    "scope": "#/properties/rating"
                }
            ]
        },
        data: {
            "name": "Send email to Adrian",
            "description": "Confirm if you have passed the subject\nHereby ...",
            "done": true,
            "rating": 3
        },
    }
]