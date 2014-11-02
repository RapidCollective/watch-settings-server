#include <pebble.h>
#include "autoconfig.h"

{% set persitantDataSize = 0 %}

  {{#each settingsList}}

    {{ #is type "bool"}}
      bool _{{ cvarname name }};
      bool get{{ capitalizeFirst cvarname name }}(){return _{{ cvarname name }};}
      void set{{ capitalizeFirst cvarname name }}(bool value){_{{ cvarname name }} = value;}
      {% set persitantDataSize = persitantDataSize + 4 + 2 %}
    {{ /is }}

    {{ #is type "string"}}
      char _{{ cvarname name }}[{{item['max-length']}}];
      {%- if (item['max-length']|int) > (124 - 1 - 7) %}
        // Generated error for string size overflow
        #error : The length of strings cannot exceed {{ 124 - 1 - 7}} bytes but your string '{{ name }}' is {{ item['max-length'] }} bytes long
      {% endif -%}
      char* get{{ capitalizeFirst cvarname name }}(){return _{{ cvarname name }};}
      void set{{ capitalizeFirst cvarname name }}(char* value){strncpy(_{{ cvarname name }}, value, {{ item['max-length'] }});}
      {% set persitantDataSize = persitantDataSize + 4 + 1 * (item['max-length']|int) %}
    {{/is}}

    {{ #is type "int"}}
      int32_t _{{ cvarname name }};
      int32_t get{{ capitalizeFirst cvarname name }}(){return _{{ cvarname name }};}
      void set{{ capitalizeFirst cvarname name }}(int32_t value){_{{ cvarname name }} = value;}
      {% set persitantDataSize = persitantDataSize + 4 + 4 %}
    {{/is}}
    {%- if persitantDataSize > 4000 %}
      // Generated error for persistant data size overflow
      #error : The size of all persisted values cannot exceed 4KB but your parameters require {{ persitantDataSize }}B
    {% endif -%}
  {{ /each }}

void autoconfig_in_received_handler(DictionaryIterator *iter, void *context) {
  Tuple *tuple = NULL;
    {{#each settingsList}}
      tuple = dict_find(iter, {{ uppercase cvarname name }}_PKEY);
      {{ #is type "string"}}
        tuple ? set{{ capitalizeFirst cvarname name }}(tuple->value->cstring) : false;
      {{ /is}}

      {{ #is type "int" or type "bool"}}
        tuple ? set{{ capitalizeFirst cvarname name }}(tuple->value->int32) : false;
      {{ /is }}

    {{ /each }}
}

void autoconfig_init(){
  app_message_register_inbox_received(autoconfig_in_received_handler);
  app_message_open(app_message_inbox_size_maximum(), app_message_outbox_size_maximum());

    {{#each settingsList}}

      if (persist_exists({{ uppercase cvarname name }}_PKEY)) {

        {{ #is type "string"}}
          persist_read_string({{ uppercase cvarname name }}_PKEY, _{{ cvarname name }}, {{item['max-length'] + 1}});
          set{{ capitalizeFirst cvarname name }}(_{{ cvarname name }});
        {{ /is }}

        {{ #is type "bool"}}
          set{{ capitalizeFirst cvarname name }}(persist_read_bool({{ uppercase cvarname name }}_PKEY));
        {{ /is }}

        {{ #is type "int"}}
          set{{ capitalizeFirst cvarname name }}(persist_read_int({{ uppercase cvarname name }}_PKEY));
        {{ /is }}
      }
    {{/each}}
}

void autoconfig_deinit(){
    {{#each settingsList}}

      {{ #is type "string"}}

        persist_write_string({{ uppercase cvarname name }}_PKEY, _{{ cvarname name }});
      {{ /is }}

      {{ #is type "bool"}}

        persist_write_bool({{ uppercase cvarname name }}_PKEY, _{{ cvarname name }});

      {{ /is }}

      {{ #is type "ing"}}
        persist_write_int({{ uppercase cvarname name }}_PKEY, _{{ cvarname name }});
      {{ /is }}

    {{ /each }}
}
