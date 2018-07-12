console.log('>>>script.js');
$(document).ready(function() {
    $.get({
        url : 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=contours-simplifies-des-departements-francais-2015&facet=code_dept',
        dataType : 'json',
        success: function(data){
            console.log(data);
        }
    })
});
