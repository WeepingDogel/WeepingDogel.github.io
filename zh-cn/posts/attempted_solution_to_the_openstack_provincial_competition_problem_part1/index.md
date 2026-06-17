# OpenStack 省赛题目尝试解决（第一部分：安装）


<!--more-->
## 引言

如你所知，我有幸被老师选中参加省级云计算竞赛。因此，我加入了学校的项目组。

作为项目组的一员，我需要努力学习并不断扩展我的知识面。为了在即将到来的省赛中取得好成绩，我们需要了解私有云的结构以及不同类型的容器云。

其中一种推荐的私有云解决方案是 **OpenStack**，它可能比较复杂，需要付出相当大的努力才能掌握。

然而，我仍然有动力去学习这项技术，因为我对 IT 和 Linux 相关主题有着浓厚的兴趣，并且我相信学习 OpenStack 的挑战最终会提升我的知识和技能。

因此，我决定在我的博客上写一些文章来记录我的学习过程。

## 准备工作

### 节点

首先，我需要了解 OpenStack 的基本示例结构。

毫无疑问，下面这张图是官方推荐的合理结构。

![](https://docs.openstack.org/install-guide/_images/hwreqs.png)

然而，受限于性能和较小的磁盘存储，我只能创建主要的 **2** 个节点和 **一个额外的资源节点** 来提供镜像和软件源。

我不会创建独立的 **对象存储节点** 和 **块存储节点**，而是选择在计算节点上添加 2 个额外的虚拟磁盘。

对于 **Cinder 服务**，我只会提供 **1** 个磁盘，分为 **2** 个分区来运行该服务。

我的 VirtualBox 设置细节如下：

![](/img/2023-05-04-17-29-02屏幕截图.png)
![](/img/2023-05-04-17-29-43屏幕截图.png)

顺便说一下，我需要解释一下 Arch 虚拟机，它只是一个资源节点，用于提供 HTTP 下载和 `yum` 软件源服务。

所以我只用了 **256MB 内存和 1 个核心**，但用了 **2** 个磁盘来存储多个大型软件源文件。

![](/img/2023-05-04-17-30-18屏幕截图.png)

### 网络

#### 网络接口

为了搭建 OpenStack 服务，每个节点（计算节点和控制节点）需要使用 2 个网络接口。

第一个用于连接 **管理网络**，第二个用于连接 **运营网络**。

| 网络接口 | 网络 | 用途 |
|:----:|:----:|:----:|
| enp0s3 | 192.168.56.0/24 | 管理网络 |
| enp0s8 | 172.129.1.0/24 | 运营网络 |

#### 节点 IP 地址

详细的网络属性如下：

| 节点 | 管理地址 | 运营地址 |
|:----:|:----:|:----:|
| controller | 192.168.56.2 | 172.129.1.1 |
| compute | 192.168.56.3 | 172.129.1.2 |
| Resource | 192.168.56.100 | 无 |

### 操作系统

控制节点和计算节点将安装 CentOS，资源节点将安装 Arch Linux。

| 节点 | 操作系统 |
|:----:|:----:|
| controller | CentOS 7 |
| compute | CentOS 7 |
| Resource | Arch Linux |

#### 设置网络

在每个节点上编辑 `/etc/sysconfig/network-scripts/ifcfg-enp0s3` 和 `/etc/sysconfig/network-scripts/ifcfg-enp0s8` 文件。

```
# vim /etc/sysconfig/network-scripts/ifcfg-enp0s3
# vim /etc/sysconfig/network-scripts/ifcfg-enp0s8
```

例如，控制节点的配置文件如下：

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

#### 启动 SSH 服务

在每个节点上启动 sshd：

```
# systemctl start sshd && systemctl enable sshd
```

## 题目

### [任务 1] 搭建私有云服务 [10.5 分]

> #### **[问题 1] 基础环境配置 [0.5 分]**
>
> 使用提供的用户名和密码，登录提供的 OpenStack 私有云平台。在当前租户下，使用 CentOS7.9 镜像和 4vCPU/12G/100G_50G 类型创建两个虚拟机。创建并连接第二个网卡到控制节点和计算节点（第二个网卡的子网为 `10.10.X.0/24`，其中 X 代表工作站编号，无需路由）。验证安全组策略以确保正常的网络通信和 ssh 连接，并按如下方式配置服务器：
> 1. 将控制节点的主机名设置为 'controller'，计算节点的主机名设置为 'compute'；
> 2. 修改 hosts 文件，将 IP 地址映射到主机名。
>
> 配置完成后，在答题框中提交控制节点的用户名、密码和 IP 地址。

第一个问题很简单，只需几个步骤即可完成。

在控制节点上：
```
[root@controller ~]# hostnamectl set-hostname controller
```
在计算节点上：
```
[root@compute ~]# hostnamectl set-hostname compute
```

编辑 `/etc/hosts` 文件：

```
[root@controller ~]# vim /etc/hosts
```

写入以下内容：
```
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
192.168.56.100 Resource
192.168.56.2 controller
192.168.56.3 compute
```

用 `:wq` 保存。

然后通过 `scp` 发送到计算节点：

```
[root@controller ~]# scp /etc/hosts root@compute:/etc/hosts
```

至此完成。

> #### **[问题 2] Yum 仓库配置 [0.5 分]**
>
> 使用提供的 ***HTTP 服务地址***，HTTP 服务下有 `CentOS 7.9` 和 `IaaS 网络 YUM 仓库`。使用该 HTTP 源作为安装 IaaS 平台的网络源。为控制节点和计算节点设置 http.repo 的 yum 源文件。完成后，在答题框中提交控制节点的用户名、密码和 IP 地址。

这个问题仍然很简单。

首先，删除两个节点上的旧 repo 文件：

```
[root@controller ~]# rm -rfv /etc/yum.repos.d/*
```

```
[root@compute ~]# rm -rfv /etc/yum.repos.d/*
```

然后，根据题目要求，创建并编辑名为 `http.repo` 的文件：

```
[root@controller ~]# vim /etc/yum.repos.d/http.repo
```

写入以下内容：

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

保存后，在 **计算节点** 上做同样的操作。

但有一个快捷方式，使用 `scp` 将文件复制过去：

```
[root@controller ~]# scp /etc/yum.repos.d/http.repo root@compute:/etc/yum.repos.d/http.repo
```

然后输入计算节点 root 的密码，文件就被发送过去了。

> #### **[问题 3] 配置 SSH 免密登录 [0.5 分]**
>
> 配置 **控制节点无需密钥即可访问计算节点**，然后尝试通过 SSH 连接计算节点的主机名进行测试。完成后，在答题框中提交控制节点的用户名、密码和 IP 地址。

这是一个必要的操作，可以让控制节点更容易地向计算节点传输文件和执行命令。

首先需要生成 SSH 密钥：

```
[root@controller ~]# ssh-keygen
```

按 <kbd>Enter</kbd> 确认生成。通常你会看到以下内容：

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

现在将密钥放到 **计算节点** 上！

执行 `ssh-copy-id`：

```
[root@controller ~]# ssh-copy-id root@compute
```

最后一次输入密码！之后就不需要再输入计算节点的 SSH 密码了！

这样就解决了！

> #### **[问题 4] 基础安装 [0.5 分]**
>
> 在 ***控制节点和计算节点上*** 安装 `openstack-iaas` 包，并根据表 2 配置两个节点脚本文件中的基本变量（配置文件脚本为 `/etc/openstack/openrc.sh`）。

根据题目要求，首先安装 `openstack-iaas` 包：

```
[root@controller ~]# yum install -y openstack-iaas 
```

```
[root@compute ~]# yum install -y openstack-iaas
```

然后编辑 `/etc/openstack/openrc.sh` 文件：

```
[root@controller ~]# vim /etc/openstack/openrc.sh
```

根据题目提供的表格信息填入配置。表格内容如下：

| 服务名称 | 变量 | 参数/密码 |
|:----:|:----:|:----:|
| Mysql | root | 000000 |
| Mysql | Keystone | 000000 |
| Mysql | Glance | 000000 |
| Mysql | Nova | 000000 |
| Mysql | Neutron | 000000 |
| Mysql | Heat | 000000 |
| Mysql | Zun | 000000 |
| Keystone | DOMAIN_NAME | demo |
| Keystone | Admin | 000000 |
| Keystone | Rabbit | 000000 |
| Keystone | Glance | 000000 |
| Keystone | Nova | 000000 |
| Keystone | Neutron | 000000 |
| Keystone | Heat | 000000 |
| Keystone | Zun | 000000 |
| Neutron | Metadata | 000000 |
| Neutron | External Network | eth1 |

通过使用 vim 命令可以快速操作：

```vim
:%s/PASS=/PASS=000000/g
```

然后删除每行开头的 `#`：

```vim
:%s/^.\{1\}//
```

最终得到的文件内容如下：

```conf
#--------------------system Config--------------------##
HOST_IP=192.168.56.2
HOST_PASS=000000
HOST_NAME=controller
HOST_IP_NODE=192.168.56.3
HOST_PASS_NODE=000000
HOST_NAME_NODE=compute
#--------------------Chrony Config-------------------##
network_segment_IP=192.168.56.0/24
#--------------------Rabbit Config ------------------##
RABBIT_USER=openstack
RABBIT_PASS=000000
#--------------------MySQL Config---------------------##
DB_PASS=000000
#--------------------Keystone Config------------------##
DOMAIN_NAME=demo
ADMIN_PASS=000000
DEMO_PASS=000000
KEYSTONE_DBPASS=000000
#--------------------Glance Config--------------------##
GLANCE_DBPASS=000000
GLANCE_PASS=000000
#--------------------Placement Config----------------------##
PLACEMENT_DBPASS=000000
PLACEMENT_PASS=000000
#--------------------Nova Config----------------------##
NOVA_DBPASS=000000
NOVA_PASS=000000
#--------------------Neutron Config-------------------##
NEUTRON_DBPASS=000000
NEUTRON_PASS=000000
METADATA_SECRET=000000
INTERFACE_NAME=enp0s3
Physical_NAME=provider1
minvlan=101
maxvlan=200
#--------------------Cinder Config--------------------##
CINDER_DBPASS=000000
CINDER_PASS=000000
BLOCK_DISK=sdb1
#--------------------Swift Config---------------------##
SWIFT_PASS=000000
OBJECT_DISK=sdb2
STORAGE_LOCAL_NET_IP=172.129.1.2
#--------------------Trove Config----------------------##
TROVE_DBPASS=000000
TROVE_PASS=000000
#--------------------Heat Config----------------------##
HEAT_DBPASS=000000
HEAT_PASS=000000
#--------------------Ceilometer Config----------------##
CEILOMETER_DBPASS=000000
CEILOMETER_PASS=000000
#--------------------AODH Config----------------##
AODH_DBPASS=000000
AODH_PASS=000000
#--------------------ZUN Config----------------##
ZUN_DBPASS=000000
ZUN_PASS=000000
KURYR_PASS=000000
#--------------------OCTAVIA Config----------------##
OCTAVIA_DBPASS=000000
OCTAVIA_PASS=000000
#--------------------Manila Config----------------##
MANILA_DBPASS=000000
MANILA_PASS=000000
SHARE_DISK=sdc1
#--------------------Cloudkitty Config----------------##
CLOUDKITTY_DBPASS=000000
CLOUDKITTY_PASS=000000
#--------------------Barbican Config----------------##
BARBICAN_DBPASS=000000
BARBICAN_PASS=000000
```

然后通过 `scp` 复制到计算节点：

```
[root@controller ~]# scp /etc/openstack/openrc.sh root@compute:/etc/openstack/openrc.sh
```

这样就解决了！

> #### **[问题 5] 数据库安装与调优 [1.0 分]**
>
> 在控制节点上使用 `iaas-install-mysql.sh` 脚本安装 Mariadb、Memcached 和 RabbitMQ 等服务。安装服务后，修改 `/etc/my.cnf` 文件以满足以下要求：
> 1. 设置数据库支持大小写敏感；
> 2. 设置 innodb 表索引、数据和插入数据缓冲区的缓存为 4GB；
> 3. 设置数据库的日志缓冲区为 64MB；
> 4. 设置数据库的重做日志大小为 256MB；
> 5. 设置数据库的重做日志文件组数为 2。

在运行 `iaas-install-mysql.sh` 之前，需要先在每个节点上运行 `iaas-pre-host.sh` 脚本，以安装服务所需的软件包。

```
[root@controller ~]# cd /usr/local/bin/
[root@controller bin]# ./iaas-pre-host.sh 
```

```
[root@compute ~]# cd /usr/local/bin/
[root@compute bin]# ./iaas-pre-host.sh 
```

脚本运行完成后，需要重新连接 SSH shell 或重启每个节点的系统。

然后在控制节点上运行 `iaas-install-mysql.sh`：

```
[root@controller bin]# ./iaas-install-mysql.sh 
```

编辑 `/etc/my.cnf` 文件：

```
[root@controller bin]# vim /etc/my.cnf
```

添加以下属性：

```cnf
lower_case_table_names = 1
innodb_buffer_pool_size = 4G
innodb_log_buffer_size = 64M
innodb_log_file_size = 256M
innodb_log_files_in_group = 2
```

确保文件看起来像这样：

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

#
# include all files from the config directory
#
!includedir /etc/my.cnf.d
```

最后用 `:wq` 保存。

问题解决了！

> #### **[问题 6] Keystone 服务安装与使用 [0.5 分]**
>
> 在控制节点上使用 `iaas-install-keystone.sh` 脚本安装 Keystone 服务。安装后，使用相关命令创建一个名为 chinaskill、密码为 `000000` 的用户。完成后，在答题框中提交控制节点的用户名、密码和 IP 地址。

安装 Keystone 服务：

```
[root@controller bin]# ./iaas-install-keystone.sh
```

如果安装成功，会看到类似如下的输出：

```
Complete!
Created symlink from /etc/systemd/system/multi-user.target.wants/httpd.service to /usr/lib/systemd/system/httpd.service.
+-------------+----------------------------------+
| Field       | Value                            |
+-------------+----------------------------------+
| description | Default Domain                   |
| enabled     | True                             |
| id          | ff38535aa995441d8641b24d86881583 |
| name        | demo                             |
+-------------+----------------------------------+
+-------------+----------------------------------+
| Field       | Value                            |
+-------------+----------------------------------+
| description | Admin project                    |
| domain_id   | ff38535aa995441d8641b24d86881583 |
| enabled     | True                             |
| id          | b0787807ee924b179cc02799bc595d38 |
| name        | myadmin                          |
+-------------+----------------------------------+
+---------------------+----------------------------------+
| Field               | Value                            |
+---------------------+----------------------------------+
| domain_id           | ff38535aa995441d8641b24d86881583 |
| enabled             | True                             |
| id                  | 7b4df65fc3ac4d4e8a764c74f0178153 |
| name                | myadmin                          |
+---------------------+----------------------------------+
+-------------+----------------------------------+
| Field       | Value                            |
+-------------+----------------------------------+
| description | Service Project                  |
| domain_id   | ff38535aa995441d8641b24d86881583 |
| enabled     | True                             |
| id          | 4eca281ad75c45669f8b178f0d26944d |
| name        | service                          |
+-------------+----------------------------------+
+-------------+----------------------------------+
| Field       | Value                            |
+-------------+----------------------------------+
| description | Demo Project                     |
| domain_id   | ff38535aa995441d8641b24d86881583 |
| enabled     | True                             |
| id          | 1256dce1e4c843b99cf50e0739308313 |
| name        | demo                             |
+-------------+----------------------------------+
+---------------------+----------------------------------+
| Field               | Value                            |
+---------------------+----------------------------------+
| domain_id           | ff38535aa995441d8641b24d86881583 |
| enabled             | True                             |
| id                  | c9f1413519a84c8ba0f9efd4d3f8d728 |
| name                | demo                             |
+---------------------+----------------------------------+
```

安装完成后，根据题目要求创建一个名为 `chinaskill` 的用户。

首先使用 `source` 命令读取 Keystone 的变量：

```
[root@controller bin]# source /etc/keystone/admin-openrc.sh
```

然后使用 `openstack` 命令创建用户：

```
[root@controller bin]# openstack user create --domain demo --password-prompt chinaskill
```

输入密码 `000000`，你会看到以下信息：

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
+---------------------+----------------------------------+
```

用户创建成功！这个问题也解决了！

> #### **[问题 7] Glance 安装与使用 [0.5 分]**
>
> 在 **控制节点** 上使用 `iaas-install-glance.sh` 脚本安装 **glance 服务**。使用命令将提供的 `cirros-0.3.4-x86_64-disk.img` 镜像（**可从 HTTP 服务获取并可独立下载**）上传到平台，命名为 cirros，并设置启动所需最小磁盘大小为 **10G**，最小内存为 **1G**。完成后，在答题框中提交控制节点的用户名、密码和 IP 地址。

首先安装 Glance：

```
[root@controller bin]# ./iaas-install-glance.sh
```

然后下载 `cirros-0.3.4-x86_64-disk.img` 镜像：

```
[root@controller bin]# cd ~
[root@controller ~]# wget http://192.168.56.100/img/cirros-0.3.4-x86_64-disk.img
```

确认文件名：

```
[root@controller ~]# ls -lh
total 13M
-rw-------. 1 root root 1.3K May  4 16:09 anaconda-ks.cfg
-rw-r--r--  1 root root  13M Apr 27  2022 cirros-0.3.4-x86_64-disk.img
```

执行命令上传镜像：

```
[root@controller ~]# openstack image create --disk-format qcow2 --container-format bare --min-disk 10 --min-ram 1024 --file ./cirros-0.3.4-x86_64-disk.img cirros
```

终端返回的结果：

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
| protected        | False                                                                                                                                                                                      |
| schema           | /v2/schemas/image                                                                                                                                                                          |
| size             | 13287936                                                                                                                                                                                   |
| status           | active                                                                                                                                                                                     |
| tags             |                                                                                                                                                                                            |
| updated_at       | 2023-05-05T15:01:42Z                                                                                                                                                                       |
| visibility       | shared                                                                                                                                                                                     |
+------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

操作成功完成！

> #### **[问题 8] Nova 安装与优化 [0.5 分]**
>
> 使用 `iaas-install-placement.sh`、`iaas-install-nova-controller.sh` 和 `iaas-install-nova-compute.sh` 脚本分别在 **控制节点** 和 **计算节点** 上安装 **Nova** 服务。安装后，修改相关 Nova 配置文件，解决因等待时间过长导致虚拟机启动超时、无法获取 IP 地址和报错的问题。配置完成后，在答题框中提交控制节点的用户名、密码和 IP 地址。

首先在控制节点上运行 `iaas-install-placement.sh` 脚本安装 placement 服务：

```
[root@controller ~]# cd /usr/local/bin/
[root@controller bin]# ./iaas-install-placement.sh 
```

安装完成后，运行 `iaas-install-nova-controller.sh` 脚本在控制节点上安装 nova 服务：

```
[root@controller bin]# ./iaas-install-nova-controller.sh
```

然后在计算节点上安装 nova 服务。在此之前，需要将控制节点的公钥复制到计算节点：

```
[root@compute ~]# ssh-copy-id root@controller
```

然后运行 `iaas-install-nova-compute.sh`：

```
[root@compute ~]# cd /usr/local/bin/
[root@compute bin]# ./iaas-install-nova-compute.sh 
```

安装成功后的输出：

```
+----+--------------+---------+------+---------+-------+------------+
| ID | Binary       | Host    | Zone | Status  | State | Updated At |
+----+--------------+---------+------+---------+-------+------------+
|  6 | nova-compute | compute | nova | enabled | up    | None       |
+----+--------------+---------+------+---------+-------+------------+
Found 2 cell mappings.
Skipping cell0 since it does not contain hosts.
Getting computes from cell 'cell1': d955f2a9-ec41-4ea0-b72a-8f3c38977c2e
Checking host mapping for compute host 'compute': c17f7c5c-5821-4891-b6ca-a6684b028db1
Creating host mapping for compute host 'compute': c17f7c5c-5821-4891-b6ca-a6684b028db1
Found 1 unmapped computes in cell: d955f2a9-ec41-4ea0-b72a-8f3c38977c2e
```

在控制节点上运行检查命令验证 nova 服务是否安装成功：

```
[root@controller bin]# source /etc/keystone/admin-openrc.sh 
[root@controller bin]# openstack compute service list
```

可以看到计算节点的主机名：

```
+----+----------------+------------+----------+---------+-------+----------------------------+
| ID | Binary         | Host       | Zone     | Status  | State | Updated At                 |
+----+----------------+------------+----------+---------+-------+----------------------------+
|  4 | nova-conductor | controller | internal | enabled | up    | 2023-05-06T03:14:27.000000 |
|  5 | nova-scheduler | controller | internal | enabled | up    | 2023-05-06T03:14:28.000000 |
|  6 | nova-compute   | compute    | nova     | enabled | up    | 2023-05-06T03:14:25.000000 |
+----+----------------+------------+----------+---------+-------+----------------------------+
```

现在进行最后一步操作，编辑 `/etc/nova/nova.conf` 文件：

```
[root@controller bin]# vim /etc/nova/nova.conf
```

将 `#vif_plugging_is_fatal=true` 改为 `vif_plugging_is_fatal=false`。使用 vim 命令快速操作：

```vim
:%s/#vif_plugging_is_fatal=true/vif_plugging_is_fatal=false/g
```

然后保存并退出：

```vim
:wq
```

又解决了一个问题！

> #### **[问题 9] Neutron 安装 [0.5 分]**
>
> 使用提供的脚本 `iaas-install-neutron-controller.sh` 和 `iaas-install-neutron-compute.sh`，在控制节点和计算节点上安装 neutron 服务。完成后，在答题框中提交控制节点的用户名、密码和 IP 地址。

这个问题很简单，只需在各节点上运行脚本：

```
[root@controller bin]# ./iaas-install-neutron-controller.sh 
```

```
[root@compute bin]# ./iaas-install-neutron-compute.sh 
```

Neutron 服务安装成功！

> #### **[问题 10] 仪表盘安装 [0.5 分]**
>
> 使用 `iaas-install-dashboad.sh` 脚本在控制节点上安装仪表盘服务。安装后，修改仪表盘中的 Django 数据以存储在文件中（此修改解决在其他云平台仪表盘中无法访问 ALL-in-one 快照的问题）。完成后，在答题框中提交控制节点的用户名、密码和 IP 地址。

运行 `iaas-install-dashboard.sh` 脚本：

```
[root@controller bin]# ./iaas-install-dashboard.sh 
```

编辑 `/etc/openstack-dashboard/local_settings` 文件：

```
[root@controller bin]# vim /etc/openstack-dashboard/local_settings
```

将 `SESSION_ENGINE = 'django.contrib.sessions.backends.cache'` 替换为 `SESSION_ENGINE = 'django.contrib.sessions.backends.file'`：

```vim
:%s/SESSION_ENGINE = 'django.contrib.sessions.backends.cache'/SESSION_ENGINE = 'django.contrib.sessions.backends.file'/g
```

保存文件：

```vim
:wq
```

通过浏览器访问仪表盘：

```
http://192.168.56.2/dashboard
```

你会看到登录页面。

![](/img/Dashboard_login.png)

使用用户名 `admin` 和密码 `000000` 登录。

![](/img/Dashboard_Overview.png)

仪表盘安装成功。

> #### **[问题 11] Swift 安装 [0.5 分]**
>
> 使用 `iaas-install-swift-controller.sh` 和 `iaas-install-swift-compute.sh` 脚本分别在控制节点和计算节点上安装 Swift 服务。安装后，使用命令创建一个名为 "examcontainer" 的容器，将 `cirros-0.3.4-x86_64-disk.img` 镜像上传到 "examcontainer" 容器，并设置每段分段存储大小为 `10M`。完成后，在答题框中提交控制节点的用户名、密码和 IP 地址。

首先需要在计算节点上创建分区。

检查磁盘：

```
[root@compute bin]# fdisk -l
```

```
Disk /dev/sda: 53.7 GB
Disk /dev/sdb: 21.5 GB
Disk /dev/sdc: 3221 MB
```

我们需要在 `/dev/sdb` 上创建两个分区：`sdb1` 用于 cinder，`sdb2` 用于 swift。

```
[root@compute bin]# fdisk /dev/sdb
```

创建两个 10G 的分区：

```
Command (m for help): n
Select (default p): p
Partition number (1-4, default 1): 
First sector (2048-41943039, default 2048): +10G
Last sector: (default 20971519) 
Using default value 20971519

Command (m for help): n
Select (default p): p
Partition number (2-4, default 2): 
First sector (2048-41943039, default 2048): 
Using default value 2048
Last sector (2048-20971519, default 20971519): 
Using default value 20971519
```

写入分区表：

```
Command (m for help): w
```

格式化分区：

```
[root@compute bin]# mkfs.ext4 /dev/sdb1
[root@compute bin]# mkfs.ext4 /dev/sdb2
```

然后运行安装脚本：

```
[root@controller bin]# ./iaas-install-swift-controller.sh 
```

```
[root@compute bin]# ./iaas-install-swift-compute.sh 
```

回到 `/root` 目录：

```
[root@controller bin]# cd ~
```

创建名为 `examcontainer` 的容器：

```
[root@controller ~]# swift post examcontainer
```

将镜像上传到容器，并设置分段大小为 10M：

```
[root@controller ~]# swift upload examcontainer -S 10000000 cirros-0.3.4-x86_64-disk.img 
```

```
cirros-0.3.4-x86_64-disk.img segment 1
cirros-0.3.4-x86_64-disk.img segment 0
cirros-0.3.4-x86_64-disk.img
```

完成！

> #### **[问题 12] 创建 Cinder 卷 [0.5 分]**
>
> 使用 `iaas-install-cinder-controller.sh` 和 `iaas-install-cinder-compute.sh` 脚本，在控制节点和计算节点上安装 Cinder 服务。在计算节点上，通过创建一个额外的 5GB 分区并将其添加到 Cinder 块存储的后端存储来扩展块存储。完成后，在答题框中提交计算节点的用户名、密码和 IP 地址。

在控制节点上安装 Cinder 服务：

```
[root@controller bin]# ./iaas-install-cinder-controller.sh
```

在计算节点上安装 Cinder 服务：

```
[root@compute bin]# ./iaas-install-cinder-compute.sh 
```

检查是否安装成功：

```
[root@compute bin]# lsblk
```

```
NAME                                            MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda                                               8:0    0   50G  0 disk 
├─sda1                                            8:1    0    1G  0 part /boot
└─sda2                                            8:2    0   49G  0 part 
  ├─centos-root                                 253:0    0 45.1G  0 lvm  /
  └─centos-swap                                 253:1    0  3.9G  0 lvm  [SWAP]
sdb                                               8:16   0   20G  0 disk 
├─sdb1                                            8:17   0   10G  0 part 
│ ├─cinder--volumes-cinder--volumes--pool_tmeta 253:2    0   12M  0 lvm  
│ │ └─cinder--volumes-cinder--volumes--pool     253:4    0  9.5G  0 lvm  
│ └─cinder--volumes-cinder--volumes--pool_tdata 253:3    0  9.5G  0 lvm  
│   └─cinder--volumes-cinder--volumes--pool     253:4    0  9.5G  0 lvm  
└─sdb2                                            8:18   0   10G  0 part /swift/node/sdb2
sdc                                               8:32   0    3G  0 disk 
```

完成。

> #### **[问题 13] Manila 服务的安装与使用 [0.5 分]**
>
> 使用 `iaas-install-manila-controller.sh` 和 `iaas-install-manila-compute.sh` 脚本分别在控制节点和计算节点上安装 Manila 服务。安装服务后，创建一个 default_share_type 共享类型（无驱动程序支持），然后创建一个名为 share01、大小为 2G 的共享存储，并授权 OpenStack 管理网段访问 share01 目录。最后，在答题框中提交控制节点的用户名、密码和 IP 地址。

为 Manila 创建分区：

```
[root@compute bin]# fdisk /dev/sdc
```

```
Command (m for help): n
Select (default p): p
Partition number (1-4, default 1): 
First sector (2048-6291455, default 2048): 
Last sector (2048-6291455, default 6291455): 
Using default value 6291455
Partition 1 of type Linux and of size 3 GiB is set
```

在控制节点上安装 Manila 服务：

```
[root@controller bin]# ./iaas-install-manila-controller.sh 
```

在计算节点上安装 Manila 服务：

```
[root@compute bin]# ./iaas-install-manila-compute.sh
```

创建 default_share_type 共享类型：

```
[root@controller bin]# manila type-create default_share_type False
```

查看 manila 类型列表：

```
[root@controller bin]# manila type-list
```

创建名为 share01、大小为 2G 的共享存储：

```
[root@controller bin]# manila create NFS 2 --name share01
```

检查是否成功：

```
[root@controller bin]# manila list
```

```
+--------------------------------------+---------+------+-------------+-----------+-----------+--------------------+-----------------------------+-------------------+
| ID                                   | Name    | Size | Share Proto | Status    | Is Public | Share Type Name    | Host                        | Availability Zone |
+--------------------------------------+---------+------+-------------+-----------+-----------+--------------------+-----------------------------+-------------------+
| 0cdd5acb-5e54-4cdd-9187-467e2800d212 | share01 | 2    | NFS         | available | False     | default_share_type | compute@lvm#lvm-single-pool | nova              |
+--------------------------------------+---------+------+-------------+-----------+-----------+--------------------+-----------------------------+-------------------+
```

授权 OpenStack 管理网段访问 share01 目录：

```
[root@controller bin]# manila access-allow share01 ip 192.168.56.0/24 --access-level rw
```

检查操作是否成功：

```
[root@controller bin]# manila access-list share01
```

```
+--------------------------------------+-------------+-----------------+--------------+--------+------------+----------------------------+------------+
| id                                   | access_type | access_to       | access_level | state  | access_key | created_at                 | updated_at |
+--------------------------------------+-------------+-----------------+--------------+--------+------------+----------------------------+------------+
| cad9f433-6ad3-4db9-afe1-90dc52374a08 | ip          | 192.168.56.0/24 | rw           | active | None       | 2023-05-06T06:55:13.000000 | None       |
+--------------------------------------+-------------+-----------------+--------------+--------+------------+----------------------------+------------+
```

完成！

> #### **[问题 14] Barbican 服务的安装与使用 [0.5 分]**
>
> 使用 `iaas-install-barbican.sh` 脚本安装 Barbican 服务。安装完成后，使用 openstack 命令创建一个名为 "secret01" 的密钥。完成后，在答题框中提交控制节点的用户名、密码和 IP 地址。

在控制节点上运行 `iaas-install-barbican.sh`：

```
[root@controller bin]# ./iaas-install-barbican.sh 
```

创建名为 "secret01" 的密钥：

```
[root@controller bin]# openstack secret store --name secret01 --payload secretkey
```

完成！

> #### **[问题 15] Cloudkitty 服务的安装与使用 [0.5 分]**
>
> 使用 `iaas-install-cloudkitty.sh` 脚本安装 cloudkitty 服务。安装后，启用 hashmap 评分模块，然后创建 volume_thresholds 组。为 volume.size 创建服务匹配规则，设置每 GB 价格为 0.01。接着，对相应的大数据量应用折扣。在 volume_thresholds 组中创建阈值，设置超过 50GB 的卷的折扣为 2%（0.98）。设置完成后，在答题框中提交控制节点的用户名、密码和 IP 地址。

运行脚本安装服务：

```
[root@controller bin]# ./iaas-install-cloudkitty.sh 
```

启用 hashmap：

```
[root@controller bin]# openstack rating module enable hashmap 
```

创建 hashmap 服务：

```
[root@controller bin]# openstack rating hashmap service create volume.size 
```

```
+-------------+--------------------------------------+
| Name        | Service ID                           |
+-------------+--------------------------------------+
| volume.size | 12b61017-6842-4d54-aa44-599d121e5f46 |
+-------------+--------------------------------------+
```

创建 hashmap 服务组：

```
[root@controller bin]# openstack rating hashmap group create volume_thresholds 
```

```
+-------------------+--------------------------------------+
| Name              | Group ID                             |
+-------------------+--------------------------------------+
| volume_thresholds | c46c8a1e-1878-4c44-bf36-57c06ce0672b |
+-------------------+--------------------------------------+
```

设置 volume 价格：

```
[root@controller bin]# openstack rating hashmap mapping create -s 12b61017-6842-4d54-aa44-599d121e5f46 -g c46c8a1e-1878-4c44-bf36-57c06ce0672b -t flat 0.01  
```

```
+--------------------------------------+-------+------------+------+----------+--------------------------------------+--------------------------------------+------------+
| Mapping ID                           | Value | Cost       | Type | Field ID | Service ID                           | Group ID                             | Project ID |
+--------------------------------------+-------+------------+------+----------+--------------------------------------+--------------------------------------+------------+
| e5f99784-e49c-47ac-98e0-6f818c3ff6fb | None  | 0.01000000 | flat | None     | 12b61017-6842-4d54-aa44-599d121e5f46 | c46c8a1e-1878-4c44-bf36-57c06ce0672b | None       |
+--------------------------------------+-------+------------+------+----------+--------------------------------------+--------------------------------------+------------+
```

创建超过 50GB 的折扣规则：

```
[root@controller bin]# openstack rating hashmap threshold create -s 12b61017-6842-4d54-aa44-599d121e5f46 -g c46c8a1e-1878-4c44-bf36-57c06ce0672b -t rate 50 0.98
```

```
+--------------------------------------+-------------+------------+------+----------+--------------------------------------+--------------------------------------+------------+
| Threshold ID                         | Level       | Cost       | Type | Field ID | Service ID                           | Group ID                             | Project ID |
+--------------------------------------+-------------+------------+------+----------+--------------------------------------+--------------------------------------+------------+
| a88e4768-defd-4c72-91f2-521b28e3c1a2 | 50.00000000 | 0.98000000 | rate | None     | 12b61017-6842-4d54-aa44-599d121e5f46 | c46c8a1e-1878-4c44-bf36-57c06ce0672b | None       |
+--------------------------------------+-------------+------------+------+----------+--------------------------------------+--------------------------------------+------------+
```

完成！

> #### **[问题 16] OpenStack 平台内存优化 [0.5 分]**
>
> 搭建 OpenStack 平台后，禁用系统中的内存共享并启用透明大页。完成后，在答题框中提交控制节点的用户名、密码和 IP 地址。

```
[root@controller ~]# find / -name defrag
```

禁用内存共享并启用透明大页：

```
[root@controller ~]# echo never > /sys/kernel/mm/transparent_hugepage/defrag 
```

检查最终结果：

```
[root@controller ~]# cat /sys/kernel/mm/transparent_hugepage/defrag 
always madvise [never]
```

完成！

> #### **[问题 17] 修改文件句柄数 [0.5 分]**
>
> 在高并发的 Linux 服务器中，通常需要提前调优 Linux 参数。默认情况下，Linux 只允许最多 1024 个文件句柄。当你的服务器在高并发时达到限制，将会遇到 "too many open files" 的错误信息。为此，创建一个云实例并修改相关配置，将控制节点的最大文件句柄数永久增加到 65535。配置完成后，在答题框中提交控制节点的用户名、密码和 IP 地址。

查看当前文件句柄限制：

```
[root@controller ~]# ulimit -n
1024
```

修改配置：

```
[root@controller ~]# echo "* soft nofile 65535" >> /etc/security/limits.conf
[root@controller ~]# echo "* hard nofile 65535" >> /etc/security/limits.conf
```

重新连接 SSH shell，再次查看：

```
[root@controller ~]# ulimit -n
65535
```

> #### **[问题 18] Linux 系统调优 - 脏数据写回 [1.0 分]**
>
> Linux 系统的内存中可能存在脏数据，系统一般默认脏数据 30 秒后写回磁盘。修改系统配置文件，将写回磁盘的时间临时调整为 60 秒。完成后，在答题框中提交控制节点的用户名、密码和 IP 地址。

编辑 `/etc/sysctl.conf` 文件：

```
[root@controller ~]# vim /etc/sysctl.conf 
```

添加以下属性：

```
vm.dirty_writeback_centisecs = 6000
```

然后执行：

```
[root@controller ~]# sysctl -p
```

验证：

```
[root@controller ~]# cat /proc/sys/vm/dirty_writeback_centisecs
6000
```

完成！

> #### **[问题 19] Linux 系统调优 - 防止 SYN 攻击 [0.5 分]**
>
> 修改控制节点上的相关配置文件，启用 SYN cookies 以防止 SYN 洪水攻击。完成后，在答题框中提交控制节点的用户名、密码和 IP 地址。

编辑 `/etc/sysctl.conf` 文件：

```
[root@controller ~]# vim /etc/sysctl.conf
```

添加以下属性：

```
net.ipv4.tcp_max_syn_backlog=2048
net.ipv4.tcp_syncookies=1
net.ipv4.tcp_syn_retries = 0
```

然后执行：

```
[root@controller ~]# sysctl -p
```

完成！

## 结语

终于，我完成了搭建 OpenStack 的所有步骤！

以上就是整个过程的学习笔记。
