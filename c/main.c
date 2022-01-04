
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>

#define TLV_MISS(target)                                          \
	do {                                                                   \
		printf(                                         \
				"TLV size does not match expected size for " target  \
				"\n");                                               \
	} while (0)

int main(int argc, char** argv)
{
		TLV_MISS("slankdev");
}

