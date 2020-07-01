/*

Filter : agentSTARTSWITHmid.server.^queue=output^EQ

*/
(function executeRule(current, previous /*null when async*/) {

    // KEEP THE NAME OF THE ORIG AGENT
    current.u_orig_agent = current.agent;

})(current, previous);