#ifndef autoconfig_h
#define autoconfig_h

#include <pebble.h>

{{#each settingsList}}

  //this defines the mapping between dev friendly name and memory friendly ID
  #define {{uppercase cvarname name }}/*cvarname & upper */_PKEY {{ appKeysAccessor name }} /*json mapping of appKeys given a name */

  {{ #is type "bool" }}
    bool get{{ capitalizeFirst cvarname name }} /* cvarname & capitalize */();
  {{ /is }}

  {{ #is type "string" }}
    char* get{{ capitalizeFirst cvarname name }} /* cvarname & capitalize */();
  {{ /is }}

  {{ #is type "int" }}
    int32_t get{{ capitalizeFirst cvarname name }} /* cvarname & capitalize */();
  {{ /is }}

{{ /each }}

void autoconfig_in_received_handler(DictionaryIterator *iter, void *context);

void autoconfig_init();

void autoconfig_deinit();

#endif
