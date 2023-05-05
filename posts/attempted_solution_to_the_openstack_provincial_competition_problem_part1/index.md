# Attempted solution to the OpenStack Provincial Competition problem (Part One: Installation)


## Introduction

As you know, I have been fortunate enough to be selected by my instructors to participate in the provincial cloud computing competition. As a result, I have joined the project group in campus.

As a member of the group, I need to study hard and continuously expand my knowledge. To achieve good results at the upcoming provincial competition, we need to learn about the structure of private clouds and the different types of container clouds.

One suggested option for a private cloud solution is **OpenStack**, which can be complex and require significant effort to master. 

However, I am still motivated to pursue this technology as I have a strong interest in IT and Linux-related topics, and I believe that the challenge of learning OpenStack will ultimately improve my knowledge and skills.

Therefore, I made a decision to write some articles on my blog site to document my study process.

## Preparation

### Nodes

At first of the first, I need to understand a basic example structrue of the OpenStack. 

Without doubt, this picture below is a reasonable and official one.

![](https://docs.openstack.org/install-guide/_images/hwreqs.png)

However, limited by the performance and small disk storage, I can only create mainly **2** nodes and **an extra resource node to provide the images and repos**.

I won't create independent **Object Storage Node** and **Block Storage Node** while it's a better choice to add 2 extra virtual disks to the Compute Node.

And for the **Cinder Service**, I will only provide **1** disk with **2** partitions to run the service.

The details of my VirutalBox properties is blow:

![](/img/2023-05-04-17-29-02屏幕截图.png)
![](/img/2023-05-04-17-29-43屏幕截图.png)

By the way, I have to explain the Arch VM, it's only a resource node to provide the HTTP downloading and `yum` repo service.

So I just use **256MB RAM and 1 core**, but **2** disks to storage the multiple and large repo files.

![](/img/2023-05-04-17-30-18屏幕截图.png)


### Network 

#### Network Interfaces

In order to set up the OpenStack Services, each node (compute and controller) need to use 2 network interfaces.

The first one is used to connect to the **Management NetWork** while the second one is used to connect the **Operation Network**.

|Network Interface|Network|Usage|
|:----:|:----:|:----:|
|enp0s3|192.168.56.0/24|Management NetWork|
|enp0s8|172.129.1.0/24|Operation Network|

#### Nodes IP Address

So the detail netowrk properties is below:

|Node|Management Address|Operation Address|
|:----:|:----:|:----:|
|controller|192.168.56.2|172.129.1.1|
|compute|192.168.56.3|172.129.1.2|
|Resource|192.168.56.100|None|


### Operating System

CentOS will be installed in the controller and compute and the Arch Linux will be installed in Resouce.

|Node|OS|
|:----:|:----:|
|controller|CentOS 7|
|compute|CentOS 7|
|Resource|Arch Linux|

#### Set up the network

Edit the file `/etc/sysconfig/network-scripts/ifcfg-enp0s3` and `/etc/sysconfig/network-scripts/ifcfg-enp0s8` on each nodes.

```
# vim /etc/sysconfig/network-scripts/ifcfg-enp0s3
# vim /etc/sysconfig/network-scripts/ifcfg-enp0s8
```

And Edit the file according to the sheet.

For example, the controller node is below:

`/etc/sysconfig/network-scripts/ifcfg-enp0s3`:

```conf
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPADDR=192.168.56.2
GATEWAY=192.168.56.1
PREFIX=24
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=enp0s3
UUID=d59932b3-b22e-4d55-893d-cdeb847bd619
DEVICE=enp0s3
ONBOOT=yes
```

`/etc/sysconfig/network-scripts/ifcfg-enp0s8`:

```conf
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPADDR=172.129.1.1
PREFIX=24
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=enp0s8
UUID=b02be511-361b-447f-b670-282850bce1f5
DEVICE=enp0s8
ONBOOT=yes
```

#### Start ssh service

Start sshd on each nodes.

```
# systemctl start sshd && systemctl enable sshd
```


## Quiz

### [Task 1] Building Private Cloud Services [10.5 points]

> #### **[Question 1] Basic environment configuration [0.5 points]**
>
>Using the provided username and password, log in to the provided OpenStack private cloud platform. Under the current tenancy, create two virtual machines using the CentOS7.9 image and 4vCPU/12G/100G_50G type. The second network card should be created and connected to both the controller and compute nodes (the second network card's subnet is `10.10.X.0/24`, where X represents the workstation number, and no routing is needed). Verify the security group policies to ensure normal network communication and ssh connection, and configure the servers as follows:
>1. Set the hostname of the control node to 'controller' and that of the compute node to 'compute';
>2. Modify the hosts file to map IP addresses to hostnames.
>
>After completing the configuration, submit the username, password, and IP address of the control node in the answer box.


The first quiz is eazy, just some steps can be done.

At the controller Node:
```
[root@controller ~]# hostnamectl set-hostname controller
```
At the compute Node:
```
[root@compute ~]# hostnamectl set-hostname compute
```

Edit the file `/etc/hosts`:

```
[root@controller ~]# vim /etc/hosts
```
Write these:
```
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
192.168.56.100 Resource
192.168.56.2 controller
192.168.56.3 compute
```

Save it by `:wq`.

Then send it to compute Node by `scp`:

```
[root@controller ~]# scp /etc/hosts root@compute:/etc/hosts
```

Finally, all the operation is complete.

> #### **[Question 2] Yum Repository Configuration [0.5 points]**
>
>Using the provided ***HTTP service address***, there are `CentOS 7.9` and `IaaS network YUM repositories` available under the HTTP service. Use this HTTP source as the network source for installing the IaaS platform. Set up the yum source file http.repo for both the controller node and compute node. After completion, submit the username, password, and IP address of the control node to the answer box.

Well, it's still a easy question.

First, delete the old repo files in two nodes:

```
[root@controller ~]# rm -rfv /etc/yum.repos.d/*
```

```
[root@compute ~]# rm -rfv /etc/yum.repos.d/*
```

Second, according to the question, we should create and edit a file named after `http.repo`.

```
[root@controller ~]# vim /etc/yum.repos.d/http.repo
```

write the information below into the file:

```conf
[centos]
name=centos
baseurl=http://Resource/centos
gpgcheck=0
enabled=1

[iaas-repo]
name=centos
baseurl=http://Resource/iaas
gpgcheck=0
enabled=1
```

Then save it, and do the same operation in the **compute** node.

But there's a quick way to use `scp` to copy the file to it.

```
[root@controller ~]# scp /etc/yum.repos.d/http.repo root@compute:/etc/yum.repos.d/http.repo
```

Then type the password of the root in compute node, the file will be sent.

And of course, I will use the quick way to do the same executions.


>#### **[Question 3] Configure SSH without keys [0.5 points]**
>
> Configure the **controller node to access the compute node without a key**, and then attempt an SSH connection to the hostname of the compute node for testing. After completion, submit the username, password, and IP address of the controller node in the answer box.

It's also an easy and necessary operation we have to do, because we can make the **controller node** easier to transfer files and execute commands in **compute node**.

So the first thing we have to do is generate a `ssh-key`:

```
[root@controller ~]# ssh-keygen
```

Then press the <kbd>Enter</kbd> to confirm your requirements of generation according to the information in terminal.

Normally you will see these:

```
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /root/.ssh/id_rsa
Your public key has been saved in /root/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:FYN98pz53tfocj5Q4DO90jqqN+lJdzXi9WKMFNjm4Wc root@Resource
The key's randomart image is:
+---[RSA 3072]----+
|         oo      |
|        . o=o    |
|          o*==   |
|         . +Ooo  |
|        S   +BE+.|
|           .+=*.o|
|          ..o*=oo|
|         .+o+o=.+|
|        .++o *o..|
+----[SHA256]-----+
```

And now it's time to put the key into the **compute node**!

Just simply execute the `ssh-copy-id`:

```
[root@controller ~]# ssh-copy-id root@compute
```

And type the password at the last time! You needn't enter the ssh password of the **compute node** anymore!

Then this quiz is solved!

> #### **[Question 4] Basic Installation [0.5 points]**
>
>Install the `openstack-iaas` package on ***both*** the **control node and compute node**, and configure the basic variables in the script files of the two nodes according to Table 2 (the configuration script file is `/etc/openstack/openrc.sh`).
>
* Table 2 Cloud Platform Configuration Information

<html xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:x="urn:schemas-microsoft-com:office:excel"
xmlns="http://www.w3.org/TR/REC-html40">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="ProgId" content="Excel.Sheet">
<meta name="Generator" content="Aspose.Cell 22.7.0">
<link rel="File-List" href="工作簿1_files/filelist.xml">
<link rel="Edit-Time-Data" href="工作簿1_files/editdata.mso">
<link rel="OLE-Object-Data" href="工作簿1_files/oledata.mso">
<!--[if gte mso 9]><xml>
 <o:DocumentProperties>
  <o:Revision>1</o:Revision>
  <o:LastSaved>2023-05-05T13:11:27Z</o:LastSaved>
</o:DocumentProperties>
</xml><![endif]-->
<style>
<!--table
 {mso-displayed-decimal-separator:"\.";
 mso-displayed-thousand-separator:"\,";}
@page
 {
 mso-header-data:"";
 mso-footer-data:"";
 margin:0.7519685039370079in 0.7007874015748032in 0.7519685039370079in 0.7007874015748032in;
 mso-header-margin:0.3in;
 mso-footer-margin:0.3in;
 mso-page-orientation:Portrait;
 }
tr
 {mso-height-source:auto;
 mso-ruby-visibility:none;}
col
 {mso-width-source:auto;
 mso-ruby-visibility:none;}
br
 {mso-data-placement:same-cell;}
ruby
 {ruby-align:left;}
.style0
 {
 mso-number-format:General;
 text-align:general;
 vertical-align:bottom;
 white-space:nowrap;
 background:auto;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"Calibri","sans-serif";
 mso-protection:locked visible;
 mso-style-name:Normal;
 mso-style-id:0;}
td
 {mso-style-parent:style0;
 mso-number-format:General;
 text-align:general;
 vertical-align:bottom;
 white-space:nowrap;
 background:auto;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"Calibri","sans-serif";
 mso-protection:locked visible;
 mso-ignore:padding;}
.x15
 {
 mso-number-format:General;
 text-align:general;
 vertical-align:bottom;
 white-space:nowrap;
 background:auto;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"Calibri","sans-serif";
 mso-protection:locked visible;
 }
.x21
 {
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:auto;
 mso-pattern:auto;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"微软雅黑","sans-serif";
 border-top:1px solid #000000;
 border-right:1px solid #000000;
 border-bottom:1px solid #000000;
 border-left:1px solid #000000;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x22
 {
 mso-number-format:General;
 text-align:left;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:auto;
 mso-pattern:auto;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"微软雅黑","sans-serif";
 border-top:1px solid #000000;
 border-right:1px solid #000000;
 border-bottom:1px solid #000000;
 border-left:1px solid #000000;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
-->
</style>
<!--[if gte mso 9]><xml>
 <x:ExcelWorkbook>
  <x:ExcelWorksheets>
   <x:ExcelWorksheet>
    <x:Name>Sheet1</x:Name>
<x:WorksheetOptions>
 <x:StandardWidth>2048</x:StandardWidth>
 <x:Print>
  <x:ValidPrinterInfo/>
  <x:PaperSizeIndex>9</x:PaperSizeIndex>
  <x:HorizontalResolution>600</x:HorizontalResolution>
  <x:VerticalResolution>600</x:VerticalResolution>
 </x:Print>
</x:WorksheetOptions>
   </x:ExcelWorksheet>
  </x:ExcelWorksheets>
  <x:WindowHeight>9720</x:WindowHeight>
  <x:WindowWidth>20955</x:WindowWidth>
  <x:WindowTopX>360</x:WindowTopX>
  <x:WindowTopY>15</x:WindowTopY>
  <x:RefModeR1C1/>
  <x:TabRatio>600</x:TabRatio>
  <x:ActiveSheet>0</x:ActiveSheet>
 </x:ExcelWorkbook>
</xml><![endif]-->
</head>
<body link='blue' vlink='purple' >

<table border='0' cellpadding='0' cellspacing='0' width='697' style='border-collapse: 
 collapse;table-layout:fixed;width:522pt'>
 <col width='210' style='mso-width-source:userset;width:157.5pt'>
 <col width='232' style='mso-width-source:userset;width:174pt'>
 <col width='255' style='mso-width-source:userset;width:191.25pt'>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td height='17' class='x21' width='210' style='height:12.75pt;width:157.5pt;'>Service Name</td>
<td class='x21' width='232' style='width:174pt;'>Variable</td>
<td class='x21' width='255' style='width:191.25pt;'>Parameter/Password</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td rowspan='7' height='131' class='x21' style='border-bottom:1px solid #000000;height:98.25pt;'>Mysql</td>
<td class='x21'>root</td>
<td class='x21'>000000</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td class='x21'>Keystone</td>
<td class='x21'>000000</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td class='x21'>Glance</td>
<td class='x21'>000000</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td class='x21'>Nova</td>
<td class='x21'>000000</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td class='x21'>Neutron</td>
<td class='x21'>000000</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td class='x21'>Heat</td>
<td class='x21'>000000</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td class='x21'>Zun</td>
<td class='x21'>000000</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td rowspan='8' height='150' class='x21' style='border-bottom:1px solid #000000;height:112.5pt;'>Keystone</td>
<td class='x21'>DOMAIN_NAME</td>
<td class='x21'>demo</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td class='x21'>Admin</td>
<td class='x21'>000000</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td class='x21'>Rabbit</td>
<td class='x21'>000000</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td class='x21'>Glance</td>
<td class='x21'>000000</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td class='x21'>Nova</td>
<td class='x21'>000000</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td class='x21'>Neutron</td>
<td class='x21'>000000</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td class='x21'>Heat</td>
<td class='x21'>000000</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td class='x21'>Zun</td>
<td class='x21'>000000</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td rowspan='2' height='36' class='x21' style='border-bottom:1px solid #000000;height:27pt;'>Neutron</td>
<td class='x21'>Metadata</td>
<td class='x21'>000000</td>
 </tr>
 <tr height='19' style='mso-height-source:userset;height:14.25pt'>
<td class='x21'>External Network</td>
<td class='x21'>eth1 (depending on actual situation)</td>
 </tr>
<![if supportMisalignedColumns]>
 <tr height='0' style='display:none'>
  <td width='210' style='width:157.5pt;'></td>
  <td width='232' style='width:174pt;'></td>
  <td width='255' style='width:191.25pt;'></td>
 </tr>
 <![endif]>
</table>

</body>

</html>

So according to the Quiz, we have to install the package `openstack-iaas` at first:

```
[root@controller ~]# yum install -y openstack-iaas 
```

```
[root@compute ~]# yum install -y openstack-iaas
```

Then edit the file `/etc/openstack/openrc.sh`:

```
[root@controller ~]# vim /etc/openstack/openrc.sh
```

With the information provided by the tables, we can simply write them into it by using `vim`.
```conf
##--------------------system Config--------------------##
##Controller Server Manager IP. example:x.x.x.x
#HOST_IP=192.168.56.2

##Controller HOST Password. example:000000 
#HOST_PASS=000000

##Controller Server hostname. example:controller
#HOST_NAME=controller

##Compute Node Manager IP. example:x.x.x.x
#HOST_IP_NODE=192.168.56.3

##Compute HOST Password. example:000000 
#HOST_PASS_NODE=000000

##Compute Node hostname. example:compute
#HOST_NAME_NODE=compute

##--------------------Chrony Config-------------------##
##Controller network segment IP.  example:x.x.0.0/16(x.x.x.0/24)
#network_segment_IP=192.168.56.0/24

......
```
But for all the `PASS=000000` we can operate quickly by using the command.

```vim
:%s/PASS=/PASS=000000/g
```

Then you will spot that there is a `#` in each of the front of the variables, we need to execute this `vim` command to delete the first character:

```vim
:%s/^.\{1\}//
```

Finally, we will get a file like this:

```conf
#--------------------system Config--------------------##
#Controller Server Manager IP. example:x.x.x.x
HOST_IP=192.168.56.2

#Controller HOST Password. example:000000 
HOST_PASS=000000

#Controller Server hostname. example:controller
HOST_NAME=controller

#Compute Node Manager IP. example:x.x.x.x
HOST_IP_NODE=192.168.56.3

#Compute HOST Password. example:000000 
HOST_PASS_NODE=000000

#Compute Node hostname. example:compute
HOST_NAME_NODE=compute

#--------------------Chrony Config-------------------##
#Controller network segment IP.  example:x.x.0.0/16(x.x.x.0/24)
network_segment_IP=192.168.56.0/24

#--------------------Rabbit Config ------------------##
#user for rabbit. example:openstack
RABBIT_USER=openstack

#Password for rabbit user .example:000000
RABBIT_PASS=000000

#--------------------MySQL Config---------------------##
#Password for MySQL root user . exmaple:000000
DB_PASS=000000

#--------------------Keystone Config------------------##
#Password for Keystore admin user. exmaple:000000
DOMAIN_NAME=demo
ADMIN_PASS=000000
DEMO_PASS=000000

#Password for Mysql keystore user. exmaple:000000
KEYSTONE_DBPASS=000000

#--------------------Glance Config--------------------##
#Password for Mysql glance user. exmaple:000000
GLANCE_DBPASS=000000

#Password for Keystore glance user. exmaple:000000
GLANCE_PASS=000000

#--------------------Placement Config----------------------##
#Password for Mysql placement user. exmaple:000000
PLACEMENT_DBPASS=000000

#Password for Keystore placement user. exmaple:000000
PLACEMENT_PASS=000000

#--------------------Nova Config----------------------##
#Password for Mysql nova user. exmaple:000000
NOVA_DBPASS=000000

#Password for Keystore nova user. exmaple:000000
NOVA_PASS=000000

#--------------------Neutron Config-------------------##
#Password for Mysql neutron user. exmaple:000000
NEUTRON_DBPASS=000000

#Password for Keystore neutron user. exmaple:000000
NEUTRON_PASS=000000

#metadata secret for neutron. exmaple:000000
METADATA_SECRET=000000

#External Network Interface. example:eth1
INTERFACE_NAME=enp0s3

#External Network The Physical Adapter. example:provider
Physical_NAME=provider1

#First Vlan ID in VLAN RANGE for VLAN Network. exmaple:101
minvlan=101

#Last Vlan ID in VLAN RANGE for VLAN Network. example:200
maxvlan=200

#--------------------Cinder Config--------------------##
#Password for Mysql cinder user. exmaple:000000
CINDER_DBPASS=000000

#Password for Keystore cinder user. exmaple:000000
CINDER_PASS=000000

#Cinder Block Disk. example:md126p3
BLOCK_DISK=sdb1

#--------------------Swift Config---------------------##
#Password for Keystore swift user. exmaple:000000
SWIFT_PASS=000000

#The NODE Object Disk for Swift. example:md126p4.
OBJECT_DISK=sdb2

#The NODE IP for Swift Storage Network. example:x.x.x.x.
STORAGE_LOCAL_NET_IP=172.129.1.2

#--------------------Trove Config----------------------##
#Password for Mysql trove user. exmaple:000000
TROVE_DBPASS=000000

#Password for Keystore trove user. exmaple:000000
TROVE_PASS=000000

#--------------------Heat Config----------------------##
#Password for Mysql heat user. exmaple:000000
HEAT_DBPASS=000000

#Password for Keystore heat user. exmaple:000000
HEAT_PASS=000000

#--------------------Ceilometer Config----------------##
#Password for Gnocchi ceilometer user. exmaple:000000
CEILOMETER_DBPASS=000000

#Password for Keystore ceilometer user. exmaple:000000
CEILOMETER_PASS=000000

#--------------------AODH Config----------------##
#Password for Mysql AODH user. exmaple:000000
AODH_DBPASS=000000

#Password for Keystore AODH user. exmaple:000000
AODH_PASS=000000

#--------------------ZUN Config----------------##
#Password for Mysql ZUN user. exmaple:000000
ZUN_DBPASS=000000

#Password for Keystore ZUN user. exmaple:000000
ZUN_PASS=000000

#Password for Keystore KURYR user. exmaple:000000
KURYR_PASS=000000

#--------------------OCTAVIA Config----------------##
#Password for Mysql OCTAVIA user. exmaple:000000
OCTAVIA_DBPASS=000000

#Password for Keystore OCTAVIA user. exmaple:000000
OCTAVIA_PASS=000000

#--------------------Manila Config----------------##
#Password for Mysql Manila user. exmaple:000000
MANILA_DBPASS=000000

#Password for Keystore Manila user. exmaple:000000
MANILA_PASS=000000

#The NODE Object Disk for Manila. example:md126p5.
SHARE_DISK=sdc1

#--------------------Cloudkitty Config----------------##
#Password for Mysql Cloudkitty user. exmaple:000000
CLOUDKITTY_DBPASS=000000

#Password for Keystore Cloudkitty user. exmaple:000000
CLOUDKITTY_PASS=000000

#--------------------Barbican Config----------------##
#Password for Mysql Barbican user. exmaple:000000
BARBICAN_DBPASS=000000

#Password for Keystore Barbican user. exmaple:000000
BARBICAN_PASS=000000
```

And then execute the `scp` command to copy it to the **compute node**, this Quiz gonna be solved!

```
[root@controller ~]# scp /etc/openstack/openrc.sh root@compute:/etc/openstack/openrc.sh
```



> #### **[Question 5] Database Installation and Tuning [1.0 point]**
>
>Use the `iaas-install-mysql.sh` script on the controller node to install services such as Mariadb, Memcached, and RabbitMQ. After installing the services, modify the `/etc/my.cnf` file to meet the following requirements:
>
>1. Set the database to support case sensitivity;
>2. Set the cache for innodb table indexes, data, and insert data buffer to 4GB;
>3. Set the database's log buffer to 64MB;
>4. Set the size of the database's redo log to 256MB;
>5. Set the number of redo log file groups for the database to 2. After completing the configuration, submit the username, password, and IP address of the controller node in the answer box.

Before we execute the `iaas-install-mysql.sh` to install services, we need to run the `iaas-pre-host.sh` script on each nodes, in order to install some packages the services need.

```
[root@controller ~]# cd /usr/local/bin/
[root@controller bin]# ./iaas-pre-host.sh 
```
```
[root@compute ~]# cd /usr/local/bin/
[root@compute bin]# ./iaas-pre-host.sh 
```

After the script finished, we need to reconnect the `ssh` shell or reboot the system of each nodes.

Then we can do the first step, run `iaas-install-mysql.sh` in **controller node**.

```
[root@controller bin]# ./iaas-install-mysql.sh 
```

And we edit the file `/etc/my.cnf`.

```
[root@controller bin]# vim /etc/my.cnf
```

Add these properties into it:

```cnf
lower_case_table_names = 1
innodb_buffer_pool_size = 4G
innodb_log_buffer_size = 64M
innodb_log_file_size = 256M
innodb_log_files_in_group = 2
```
Make sure your file look like this:
```
#
# This group is read both both by the client and the server
# use it for options that affect everything
#
[client-server]

#
# This group is read by the server
#
[mysqld]
# Disabling symbolic-links is recommended to prevent assorted security risks
lower_case_table_names = 1
innodb_buffer_pool_size = 4G
innodb_log_buffer_size = 64M
innodb_log_file_size = 256M
innodb_log_files_in_group = 2
symbolic-links=0
default-storage-engine = innodb
innodb_file_per_table
collation-server = utf8_general_ci
init-connect = 'SET NAMES utf8'
character-set-server = utf8
max_connections=10000
default-storage-engine = innodb
innodb_file_per_table
collation-server = utf8_general_ci
init-connect = 'SET NAMES utf8'
character-set-server = utf8
max_connections=10000

#
# include all files from the config directory
#
!includedir /etc/my.cnf.d
```

Finally we Save it.
```vim
:wq
```

The quiz was sovled!


> #### **[Question 6] Keystone Service Installation and Usage [0.5 points]**
>
> Use the `iaas-install-keystone.sh` script on the controller node to install the Keystone service. After installation, use the relevant commands to create a user named chinaskill with the password `000000`. Upon completion, submit the username, password, and IP address of the controller node in the answer box.


To install the Keystone service, we need to run the `iaas-install-keystone.sh` script:
```
[root@controller bin]# ./iaas-install-keystone.sh
```

If the installation is successful, the information backed should be like:

```
......
Complete!
Created symlink from /etc/systemd/system/multi-user.target.wants/httpd.service to /usr/lib/systemd/system/httpd.service.
+-------------+----------------------------------+
| Field       | Value                            |
+-------------+----------------------------------+
| description | Default Domain                   |
| enabled     | True                             |
| id          | ff38535aa995441d8641b24d86881583 |
| name        | demo                             |
| options     | {}                               |
| tags        | []                               |
+-------------+----------------------------------+
+-------------+----------------------------------+
| Field       | Value                            |
+-------------+----------------------------------+
| description | Admin project                    |
| domain_id   | ff38535aa995441d8641b24d86881583 |
| enabled     | True                             |
| id          | b0787807ee924b179cc02799bc595d38 |
| is_domain   | False                            |
| name        | myadmin                          |
| options     | {}                               |
| parent_id   | ff38535aa995441d8641b24d86881583 |
| tags        | []                               |
+-------------+----------------------------------+
+---------------------+----------------------------------+
| Field               | Value                            |
+---------------------+----------------------------------+
| domain_id           | ff38535aa995441d8641b24d86881583 |
| enabled             | True                             |
| id                  | 7b4df65fc3ac4d4e8a764c74f0178153 |
| name                | myadmin                          |
| options             | {}                               |
| password_expires_at | None                             |
+---------------------+----------------------------------+
+-------------+----------------------------------+
| Field       | Value                            |
+-------------+----------------------------------+
| description | Service Project                  |
| domain_id   | ff38535aa995441d8641b24d86881583 |
| enabled     | True                             |
| id          | 4eca281ad75c45669f8b178f0d26944d |
| is_domain   | False                            |
| name        | service                          |
| options     | {}                               |
| parent_id   | ff38535aa995441d8641b24d86881583 |
| tags        | []                               |
+-------------+----------------------------------+
+-------------+----------------------------------+
| Field       | Value                            |
+-------------+----------------------------------+
| description | Demo Project                     |
| domain_id   | ff38535aa995441d8641b24d86881583 |
| enabled     | True                             |
| id          | 1256dce1e4c843b99cf50e0739308313 |
| is_domain   | False                            |
| name        | demo                             |
| options     | {}                               |
| parent_id   | ff38535aa995441d8641b24d86881583 |
| tags        | []                               |
+-------------+----------------------------------+
+---------------------+----------------------------------+
| Field               | Value                            |
+---------------------+----------------------------------+
| domain_id           | ff38535aa995441d8641b24d86881583 |
| enabled             | True                             |
| id                  | c9f1413519a84c8ba0f9efd4d3f8d728 |
| name                | demo                             |
| options             | {}                               |
| password_expires_at | None                             |
+---------------------+----------------------------------+
+-------------+----------------------------------+
| Field       | Value                            |
+-------------+----------------------------------+
| description | None                             |
| domain_id   | None                             |
| id          | 7ad524a1308d4089a01347dbf09d2044 |
| name        | user                             |
| options     | {}                               |
+-------------+----------------------------------+
+------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Field      | Value                                                                                                                                                                                   |
+------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| expires    | 2023-05-05T14:51:32+0000                                                                                                                                                                |
| id         | gAAAAABkVQnk9i7FQoKaw9VKNqZuEbVOmoaE-bCPPYlEy-kBqZyxOmk9o3PKLt6IxyCnfU9jO_dvd7yMpGl9LuhaXqiFHycPiIUSCoP-har-EhxmH1IUWK303DcD6jGi4GvBufnTtx7tYIIJgrA-NdMCRJu2lkSnKxCwmvI8pjz7drBwnxDl9Ps |
| project_id | b0787807ee924b179cc02799bc595d38                                                                                                                                                        |
| user_id    | 7b4df65fc3ac4d4e8a764c74f0178153                                                                                                                                                        |
+------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

```

After the installation, we need to create a user named 'chinaskill' according to the question.

So, first we use the `source` command to read the variables of `Keystone`:

```
[root@controller bin]# source /etc/keystone/admin-openrc.sh
```
Then create the user by using `openstack` command 
```
[root@controller bin]# openstack user create --domain demo --password-prompt chinaskill
```

Then type the password `000000`, you will get these information:

```
User Password:
Repeat User Password:
+---------------------+----------------------------------+
| Field               | Value                            |
+---------------------+----------------------------------+
| domain_id           | ff38535aa995441d8641b24d86881583 |
| enabled             | True                             |
| id                  | 206814a5dfba4a9194701d124a815ca3 |
| name                | chinaskill                       |
| options             | {}                               |
| password_expires_at | None                             |
+---------------------+----------------------------------+
```

It means that you create the user successfully! And this quiz was also solved!

> #### **[Question 7] Glance Installation and Usage [0.5 points]**
>
> Use the `iaas-install-glance.sh` script on the **controller node** to install the **glance service**. Use the command to upload the provided `cirros-0.3.4-x86_64-disk.img` image (**which is available on an HTTP service and can be downloaded independently**) to the platform, name it cirros, and set the minimum required disk size for startup to **10G** and the minimum required memory for startup to **1G**. After completion, submit the username, password, and IP address of the controller node to the answer box.

Well, it's a little chanllenging, isn't it?

But don't worry, we do the installation at first:

```
[root@controller bin]# ./iaas-install-glance.sh
```

Then we download the `cirros-0.3.4-x86_64-disk.img`

```
[root@controller bin]# cd ~
[root@controller ~]# wget http://192.168.56.100/img/cirros-0.3.4-x86_64-disk.img
```

Confirm the filename:

```
[root@controller ~]# ls -lh
total 13M
-rw-------. 1 root root 1.3K May  4 16:09 anaconda-ks.cfg
-rw-r--r--  1 root root  13M Apr 27  2022 cirros-0.3.4-x86_64-disk.img
```

Then we execute the command to upload the image:

```
[root@controller ~]# openstack image create --disk-format qcow2 --container-format bare --min-disk 10 --min-ram 1024 --file ./cirros-0.3.4-x86_64-disk.img cirros
```

Then you will see the result returned by terminal:
```
+------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Field            | Value                                                                                                                                                                                      |
+------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| checksum         | ee1eca47dc88f4879d8a229cc70a07c6                                                                                                                                                           |
| container_format | bare                                                                                                                                                                                       |
| created_at       | 2023-05-05T15:01:42Z                                                                                                                                                                       |
| disk_format      | qcow2                                                                                                                                                                                      |
| file             | /v2/images/62102ae0-27c3-4bc1-ad87-44be814237f4/file                                                                                                                                       |
| id               | 62102ae0-27c3-4bc1-ad87-44be814237f4                                                                                                                                                       |
| min_disk         | 10                                                                                                                                                                                         |
| min_ram          | 1024                                                                                                                                                                                       |
| name             | cirros                                                                                                                                                                                     |
| owner            | b0787807ee924b179cc02799bc595d38                                                                                                                                                           |
| properties       | os_hash_algo='sha512', os_hash_value='1b03ca1bc3fafe448b90583c12f367949f8b0e665685979d95b004e48574b953316799e23240f4f739d1b5eb4c4ca24d38fdc6f4f9d8247a2bc64db25d6bbdb2', os_hidden='False' |
| protected        | False                                                                                                                                                                                      |
| schema           | /v2/schemas/image                                                                                                                                                                          |
| size             | 13287936                                                                                                                                                                                   |
| status           | active                                                                                                                                                                                     |
| tags             |                                                                                                                                                                                            |
| updated_at       | 2023-05-05T15:01:42Z                                                                                                                                                                       |
| virtual_size     | None                                                                                                                                                                                       |
| visibility       | shared                                                                                                                                                                                     |
+------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

It means the operation is finished and successful!

Now this quiz was solved!

#### **To be continued....**

## Conclusion
