# Clustered MID Server for Import Set

## Problem

In ServiceNow Import Set data sources are linked to MID servers (`sys_data_source.mid_server` -> `ecc_agent`). If that MID server is in a cluster, the corresponding `ecc_queue` records will be assigned to one of the agents of the cluster and be different from what is defined in the data source.

ServiceNow internally the JDBC probe complete query unfortunately checks in addition to the agent_correlation (which is correct) also the agent name to be one defined in the data source (which will not be the case if the MID agent is clustered). As this query does not resolve, the import will time out.

## Solutions

1. One option is to not cluster MID agents used for import sets. But that's actually a bad idea.

2. Dynamically change the MID server name on the data source. A business rule on `ecc_queue` could update its sys_data_source record with the cluster assigned to the job. Would work but changing MID server name on the data source might confuse and lead into issues on deployment.

3. Keep a copy of the original MID agent name before one of the cluster partners is selected on the eqq_queue. And put it back once the job is completed.

## Implementation

All it requires are 2 business rules plus an additional field on `ecc_queue`.

### Dictionary change

New field `u_orig_agent` on `ecc_queue`.

### Business Rules

- Before business rule [MID Server Cluster - Copy orig MID name] with order **1**
- Before business rule [MID Server Cluster - Restore MID name] with order **1111**

## Update Set

All required changes can be found in this [Update Set][MID Agent Cluster for Import Set]

[MID Server Cluster - Copy orig MID name]: mid_server_cluster_copy_orig_mid_name.js
[MID Server Cluster - Restore MID name]: mid_server_cluster_restore_mid_name.js
[MID Agent Cluster for Import Set]: mid_agent_cluster_for_import_set.xml
