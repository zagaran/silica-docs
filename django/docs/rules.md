# Rules
We define a number of helper functions which are composable to allow fairly complex logical statements to be written.

A rule is composed of a target field, an Effect, and the Conditions which cause that effect. In the context of a 
Silica-enabled form, the target field is the key of the dictionary, which should be the name of the field. The value of 
that key should be an effect whose kwargs are the other fields on the form whose values are relevant; the value of the kwarg
should be the Condition under which it should activate. For example:

```python
# assuming fields are is_eligible, override_valid, and show_all_fields
rules = {
    'eligibility': ShowIf(Or(is_eligible=True, And(override_valid=True, show_all_fields=True)))
}


```

## Effects
We support all effects in the JSONForms.io spec:`ShowIf`/`HideIf` and `EnableIf`/`DisableIf`.

### Conditions
We allow complex conditions to be chained together using `Or`, `And`, or `Not`. All of these operators have the same 
signature and usage. 

The arguments passed to an Effect must be Conditions; you may also pass kwargs in the form of `field_name=valid_value_or_values`.

To instantiate a Boolean condition, pass the acceptable values for a given field as a kwarg, e.g. `Or(key1=1)`. This value
can be either a single value, a list of multiple acceptable values, or another Boolean condition.