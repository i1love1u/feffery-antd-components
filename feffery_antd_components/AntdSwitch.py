# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class AntdSwitch(Component):
    """An AntdSwitch component.


Keyword arguments:

- id (string; optional)

- autoFocus (boolean; default False)

- batchPropsNames (list of strings; optional)

- batchPropsValues (dict; optional)

- checked (boolean; optional)

- checkedChildren (a list of or a singular dash component, string or number; optional)

- className (string | dict; optional)

- disabled (boolean; default False)

- key (string; optional)

- loading (boolean; default False)

- loading_state (dict; optional)

    `loading_state` is a dict with keys:

    - component_name (string; optional):
        Holds the name of the component that is loading.

    - is_loading (boolean; optional):
        Determines if the component is loading or not.

    - prop_name (string; optional):
        Holds which property is loading.

- persisted_props (list of a value equal to: 'checked's; default ['checked']):
    Properties whose user interactions will persist after refreshing
    the  component or the page. Since only `value` is allowed this
    prop can  normally be ignored.

- persistence (boolean | string | number; optional):
    Used to allow user interactions in this component to be persisted
    when  the component - or the page - is refreshed. If `persisted`
    is truthy and  hasn't changed from its previous value, a `value`
    that the user has  changed while using the app will keep that
    change, as long as  the new `value` also matches what was given
    originally.  Used in conjunction with `persistence_type`.

- persistence_type (a value equal to: 'local', 'session', 'memory'; default 'local'):
    Where persisted user changes will be stored:  memory: only kept in
    memory, reset on page refresh.  local: window.localStorage, data
    is kept after the browser quit.  session: window.sessionStorage,
    data is cleared once the browser quit.

- readOnly (boolean; default False)

- size (a value equal to: 'default', 'small'; default 'default')

- style (dict; optional)

- unCheckedChildren (a list of or a singular dash component, string or number; optional)"""
    _children_props = ['checkedChildren', 'unCheckedChildren']
    _base_nodes = ['checkedChildren', 'unCheckedChildren', 'children']
    _namespace = 'feffery_antd_components'
    _type = 'AntdSwitch'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, className=Component.UNDEFINED, style=Component.UNDEFINED, key=Component.UNDEFINED, disabled=Component.UNDEFINED, autoFocus=Component.UNDEFINED, checked=Component.UNDEFINED, checkedChildren=Component.UNDEFINED, unCheckedChildren=Component.UNDEFINED, size=Component.UNDEFINED, loading=Component.UNDEFINED, readOnly=Component.UNDEFINED, batchPropsNames=Component.UNDEFINED, batchPropsValues=Component.UNDEFINED, loading_state=Component.UNDEFINED, persistence=Component.UNDEFINED, persisted_props=Component.UNDEFINED, persistence_type=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'autoFocus', 'batchPropsNames', 'batchPropsValues', 'checked', 'checkedChildren', 'className', 'disabled', 'key', 'loading', 'loading_state', 'persisted_props', 'persistence', 'persistence_type', 'readOnly', 'size', 'style', 'unCheckedChildren']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'autoFocus', 'batchPropsNames', 'batchPropsValues', 'checked', 'checkedChildren', 'className', 'disabled', 'key', 'loading', 'loading_state', 'persisted_props', 'persistence', 'persistence_type', 'readOnly', 'size', 'style', 'unCheckedChildren']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(AntdSwitch, self).__init__(**args)
