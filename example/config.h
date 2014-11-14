#ifndef watchsettings_h
#define watchsettings_h

#include <pebble.h>

#define STARBUCKS_PKEY 0
char* getStarbucksToken();

#define SHOWADS_PKEY 1
bool getShowAds();

#define FIRSTNAME_PKEY 2
char* getFirstName();

#define AGE_PKEY 3
char* getAge();

#define COLOR_PKEY 4
char* getColor();

void autoconfig_in_received_handler(DictionaryIterator *iter, void *context);

void autoconfig_init();

void autoconfig_deinit();

#endif
