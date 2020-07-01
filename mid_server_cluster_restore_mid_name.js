/*

Filter : agentSTARTSWITHmid.server.^queue=input^topic=JDBCProbeCompleted^EQ

*/

(function executeRule(current, previous /*null when async*/) {
    // copy back the orig agent value

    if (gs.nil(current.response_to))
        return;

    // look up the orig outbound message
    var gr = new GlideRecord('ecc_queue');
    if (gr.get(current.getValue('response_to'))) {

        if (!gs.nil(gr.u_orig_agent)) {
            // keep the processing mid server for reference
            current.setValue('u_orig_agent', current.getValue('agent'));

            // copy back the name of the init mid server
            current.setValue('agent', gr.getValue('u_orig_agent'));
        }
    }


})(current, previous);