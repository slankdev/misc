#!/usr/bin/env python3
from scapy.all import *

src_mac = "aa:11:22:33:44:55"
dst_mac = "aa:bb:cc:dd:ee:ff"
src_ip = "192.168.1.1"
dst_ip = "192.168.1.2"
dst_port = 5678
payload = "Hello, World!"
src_srh = "::1"
dst_srh = "2001:db8::3"
sidlist = ['::1']
pcap_file = "output.pcap"

packets = []
for src_port in range(1024, 2048):
    tmp = Ether(src=src_mac, dst=dst_mac)
    tmp = tmp / IPv6(src=src_ip, dst=dst_srh, nh=43, fl=src_port)
    tmp = tmp / IPv6ExtHdrSegmentRouting(segleft=len(sidlist)-1, lastentry=len(sidlist)-1, addresses=sidlist)
    tmp = tmp / IP(src=src_ip, dst=dst_ip)
    tmp = tmp / UDP(sport=src_port, dport=dst_port)
    tmp = tmp / payload
    packets.append(tmp)
wrpcap(pcap_file, packets)
