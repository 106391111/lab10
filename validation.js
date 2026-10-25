/* Function validate() will evaluate client-side form data using jQuery */
function validate() {
    // Convert old JavaScript DOM methods to jQuery equivalents
    var sid = $("#sid").val();
    var pwd1 = $("#pwd1").val();
    var pwd2 = $("#pwd2").val();
    var uname = $("#uname").val();
    var genm = $("#genm").prop("checked");
    var genf = $("#genf").prop("checked");

    var errMsg = "";               /* Create variable to store the error messages */
    var result = true;             /* Assumes no errors by default */
    var pattern = /^[a-zA-Z ]+$/;  /* Regular expression for letters and spaces only */

    /* Rule 1: Check if all required fields are filled out */
    if (sid == "") {
        errMsg += "<li>User ID cannot be empty.</li>";
    }
    if (pwd1 == "") {
        errMsg += "<li>Password cannot be empty.</li>";
    }
    if (pwd2 == "") {
        errMsg += "<li>Retype password cannot be empty.</li>";
    }
    if (uname == "") {
        errMsg += "<li>User name cannot be empty.</li>";
    }
    if (!genm && !genf) {
        errMsg += "<li>A gender must be selected.</li>";
    }
    
    /* Rule 2: Check if the user ID behaves like an email address */
    if (sid.indexOf('@') == 0 ) {
        errMsg += "<li>User ID cannot start with an @ symbol.</li>";
    }
    if (sid.indexOf('@') < 0 ) {
        errMsg += "<li>User ID must contain an @ symbol.</li>";
    }
    
    /* Rule 3: Check if password inputs match matching constraints */
    if (pwd1 != pwd2) {
        errMsg += "<li>Passwords do not match.</li>";
    }
    
    /* Rule 4: Check if user name contains only legal letters */
    if (uname != "" && !uname.match(pattern)) {
        errMsg += "<li>User name contains symbols.</li>";
    }

    /* Display HTML+CSS modal pop-up window if error(s) are detected */
    if (errMsg != "") {
        // Build the modal window elements dynamically
        var dynamicHTML = "<div id='scrnOverlay'></div>"
                        + "<section id='errWin' class='window'><ul>"
                        + errMsg
                        + "</ul><div class='buttonrow'><a href='#' id='errBtn' class='button'>Close</a></div></section>";
        
        // Inject elements immediately after the opening body tag
        $("body").prepend(dynamicHTML);
        
        // Calculate dynamic height based on how many rules failed
        var numOfItems = (($(".window ul li").length) + 6);
        
        // Adjust the layout visualization settings and render the box
        $("#scrnOverlay").css('visibility', 'visible');
        $("#errWin").css('height', numOfItems.toString() + 'em');
        $("#errWin").css('margin-top', (numOfItems / -2).toString() + 'em');
        $("#errWin").show();
        
        // Register click event to dismiss the pop up box windows gracefully
        $("#errBtn").click(function () {
            $("#scrnOverlay").remove();
            $("#errWin").remove();
        });

        result = false;
    } 
    return result;
}

/* Function toggle() handles the collapse/expand feature */
function toggle() {
    // Find the parent div container, locate its sibling element (fieldset), and animate it
    $(this).parent().next().slideToggle();
    
    // Dynamically replace the string text context symbol
    if ($(this).html() == "[-]"){
        $(this).html("[+]");
    } else {
        $(this).html("[-]");
    }
}

/* Link HTML elements to corresponding event functions */
function init() {
    // Bind click trigger actions onto class targets 
    $(".collapse").click(toggle);
    
    // Use jQuery to capture and intercept the form submit context event
    $("#regform").submit(validate);
}

/* Execute function init() once the window document is loaded */
$(document).ready(init);
