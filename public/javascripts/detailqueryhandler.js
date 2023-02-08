$(document).ready(function () {
    $('.btn-details').click(function () {
        
        //get the subscription id
        var id = $(this).attr("value");
        
        //clear table rows
        $('#subscriptiondetails').find('tr').remove();
        
        //make server side request for subscription details
        $.ajax({
            url: "/lookupdetail",
            type: "POST",
            dataType: "json",
            data: JSON.stringify({ subscriptionid: id }),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function () {
                //called when complete
                //alert('complete');
            },
            
            success: function (data) {
                
                //create table based on subscription detail results
                $('#subscriptiondetails').append('<tr><td class=\'subscriptiondetailheader\'>Name:</td><td>'+ data.subscription.subscriptionName +'</td></tr>');
                $('#subscriptiondetails').append('<tr><td class=\'subscriptiondetailheader\'>Party:</td><td>' + data.subscription.subscriptionParty + '</td></tr>');
                for (var i = 0; i < data.subscription.Donations.length; i++) {
                    $('#subscriptiondetails').append('<tr><td class=\'subscriptiondetailheader\'>Donation:</td><td>' + data.subscription.Donations[i].Donation_Date__c + ' - '+ data.subscription.Donations[i].Candidate_Name__c +' ($'+ data.subscription.Donations[i].Amount__c +')</td></tr>');
                }
            },
            
            error: function () {
                alert('error');
            },
        });
        
        return false;
    });    
});