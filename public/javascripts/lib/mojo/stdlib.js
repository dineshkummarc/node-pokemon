dojo.provide("stdlib.command.UpdateObserversCommand");
dojo.require("mojo.controller.Controller");
dojo.require("mojo.command.Command");

dojo.declare("stdlib.command.UpdateObserversCommand", mojo.command.Command, {
	execute: function(requestObj) {
		var timeout = setTimeout(function() {
			mojo.controller.Controller.updateObservers(requestObj.getParams().controllerName);
			clearTimeout(timeout);
		}, 20);


	}
});
/* 
	Class: stdlib.behavior.DisableBoxBehavior
	Author: Jaime Bueza
	
	Provides functionality to disable parts of the UI or the whole UI
	with a loading screen. Developers may specifiy the throbber className
	if they wish, but by default the generated throbber className will be
	"throbber". To define its presentation, do the following:
	
	Example:
		(start code)

		#disablebox {
			background: transparent  url("../../img/global/bg-loading-throbber.png") center center no-repeat;
			_background: transparent  url("../../img/global/bg-loading-throbber.gif") center center no-repeat; 
			_background: none;
			text-align: center;
		}
		#disablebox .throbber {
			position: absolute;
			background: url("../../img/global/icon-loading-throbber.gif");
			width: 16px;
			height: 16px;
		}
		
		(end)
	
	Parameters:
		target - {HTMLElement} The target element you wish to disable
		show - {Boolean} Shows the disablebox on/off
		throbberClass - {String} The specific className of the throbber.
		
*/
dojo.provide("stdlib.behavior.DisableBoxBehavior");
dojo.require("mojo.command.Behavior");

dojo.declare("stdlib.behavior.DisableBoxBehavior", mojo.command.Behavior,
{
	_box: null,
	execute: function(requestObj) {
		var params = requestObj.getParams();
		if (!this._box) {
			this._box = mojo.queryFirst("#disablebox");
			if (!this._box) { //recovery + creation
				this._box = document.createElement("div");
				this._box.id = "disablebox";
				document.body.appendChild(this._box);
				this._box.style.position = "absolute";
			}
		}
		
		//Clean up
		this._box.innerHTML = "";

		if (requestObj.getParams().show) {
			var throbber = document.createElement("div");
			throbber.className = params.throbberClass || "throbber";
			var offset = dojo.coords(requestObj.getParams().target, true);
			if (requestObj.getParams().target) {
				
				this._box.style.top = offset.y + "px";
				this._box.style.left = offset.x + "px";
				this._box.style.width = offset.w + "px";
				this._box.style.height = offset.h + "px";
				
				//Shift up and left 8 px since the loader gif is 16x16.
				throbber.style.left = ((offset.w / 2) - 8) + "px";
				throbber.style.top = ((offset.h / 2)  - 8) + "px";
	
				this._box.appendChild(throbber);
				
				
			} else {
				this._box.style.top = "0px";
				this._box.style.left = "0px";
				this._box.style.width = "100%";
				this._box.style.height = (document.all) ? document.body.offsetHeight + "px" : "100%";
				
				throbber.style.left = ((offset.w / 2) - 8) + "px";
				throbber.style.top = ((offset.h / 2)  - 8) + "px";
				
				this._box.appendChild(throbber);
			}
			this._box.style.zIndex = "9999";
			this._box.style.display = "block";
		} else {
			this._box.style.display = "none";
		}
	}
});

dojo.provide("stdlib.behavior.MessagingBehavior");
dojo.require("mojo.command.Behavior");

dojo.declare("stdlib.behavior.MessagingBehavior", mojo.command.Behavior,
{
	execute: function(requestObj) {
		mojo.Messaging.publish(requestObj.paramsObj.topic, requestObj.paramsObj.message);
	}
});
dojo.provide("stdlib.behavior.RedirectBehavior");
dojo.require("mojo.command.Behavior");
dojo.declare("stdlib.behavior.RedirectBehavior", mojo.command.Behavior,
{
	execute: function(requestObj) {
		//If you pass don't pass a URL, it can be assumed
		//that you intend to refresh the current page.
		var params 	= requestObj.getParams();
		var delay = 25;
		if (params) {
			var url    	= params.url; //Location of the redirect
			var removeHash 	= params.removeHash || false; //If removeHash doesn't exist, then it's false.
			var delay 	= params.delay || 25;	//25ms redirect delay by default
		}
		if (!url) {
			//We want to refresh the page.
			if (removeHash) {
				window.location = window.location.href.replace(/#.*/, "");
				setTimeout ("window.location.reload()", 750); //Safari hack to reload
			} else {
				window.location.reload();
			}
		} else {
			//We want to redirect the user to a specific URL.
			setTimeout(function() {
				window.location.href = url;
			}, delay);

		}
	}
});

dojo.provide("stdlib.behavior.UpdateCssClassBehavior");
dojo.require("mojo.command.Behavior");

dojo.declare("stdlib.behavior.UpdateCssClassBehavior", mojo.command.Behavior,
{
	execute: function(requestObj) {

// element - DOM element to apply CSS action to
// action - action to perform [add|remove|set|toggle]
// cssClass - CSS Class to apply action to

		var elmLength;											// empty var which will be used to store the length of the array
		var elms = requestObj.paramsObj.element;				// gets the parameter "element" from the controller
		var action = requestObj.paramsObj.action;
		var cssClass = requestObj.paramsObj.cssClass;


		// ERROR CHECKING
		if (elms == null || typeof elms == 'undefined') {
			return;
		} else {
			if (typeof elms == 'object') {
				//check array to see that all items are objects
				if (elms.length > 0) {
					for (var i=0; i< elms.length; i++) {
						if (typeof elms[i] != 'object') {
							throw new Error('ERROR stdlib.behavior.UpdateCssClassBehavior - element parameter is not an array of type Object');
							break;
						}
					}
				}
			} else {
				throw new Error('ERROR stdlib.behavior.UpdateCssClassBehavior - element parameter is not a type Object');
			}
		}

		if (action == null || typeof action == 'undefined') {
			throw new Error('ERROR stdlib.behavior.UpdateCssClassBehavior - action parameter is required');
		} else {
			if (typeof action != 'string') {
				throw new Error('ERROR stdlib.behavior.UpdateCssClassBehavior - action parameter is not a type String');
			} else {
				if ((action != 'add') && (action != 'remove') && (action != 'set') && (action != 'toggle')) throw new Error('ERROR stdlib.behavior.UpdateCssClassBehavior - action parameter is invalid');
			}
		}

		if (cssClass == null || typeof cssClass == 'undefined') {
			throw new Error('ERROR stdlib.behavior.UpdateCssClassBehavior - CssClass parameter is required');
		} else {
			if (typeof cssClass == 'object') {
				//check array to see that all items are objects
				if (cssClass.length > 0) {
					for (var i = 0; i< cssClass.length; i++) {
						if (typeof cssClass[i] != 'string') {
							throw new Error('ERROR stdlib.behavior.UpdateCssClassBehavior - CssClass parameter is not an array of type String');
							break;
						}
					}
				}
			} else {
				if (typeof cssClass != 'string') throw new Error('ERROR stdlib.behavior.UpdateCssClassBehavior - CssClass parameter is not a type String');
			}
		}



// checks to see that an element has been passed
		if (elms) {

// helper function. checks to see if the elms variable is an array.
			var isArray = function(srcObj) {
				if (!srcObj.constructor || srcObj.constructor.toString().toLowerCase().indexOf("array") == -1) return false;
				return true;
			};


// if elms is not an array, make it an array
			if (!isArray(elms)) elms = [elms];

// if cssClass is not an array, make it an array
			if (!isArray(cssClass)) cssClass = [cssClass];

// gets the length of the cssClass array for performance issues
			cssLength = cssClass.length;

// gets the length of the elms array for performance issues
			elmLength = elms.length;

// loops through the elements
			for (var i = 0; i < elmLength; i++) {
				elm = elms[i];
				// loops through the css classes
				for (var j = 0; j < cssLength; j++) {
					css = cssClass[j];
					// perform the CSS action
					if (action.length > 0){
						// just a nicer way of doing an If/Else
						switch(action) {
							case "add" :
								dojo.addClass(elm, css);
								break;
							case "remove" :
								dojo.removeClass(elm, css);
								break;
							case "set" :
								elm.className = "";
								dojo.addClass(elm, css);
								break;
							case "toggle" :
								dojo.toggleClass(elm, css);
								break;
						}
					}
				}
			}
		}
	},
	onResponse: function() {
	}
});

dojo.provide("stdlib.command.MapControllersCommand");
dojo.require("mojo.command.Command");

dojo.declare("stdlib.command.MapControllersCommand", mojo.command.Command, {
	execute: function(requestObj) {

		var contextObj = null;
		if(requestObj.getParams()) {

			// parameters: contextObj: String or HTMLElement
			contextObj = requestObj.getParams().contextObj;
		}

		mojo.controller.Map.mapControllers(contextObj);



	}
});

dojo.provide("stdlib.command.UpdateControllerParamCommand");
dojo.require("mojo.command.Command");

dojo.declare("stdlib.command.UpdateControllerParamCommand", mojo.command.Command, {
	execute: function(requestObj) {
		var __elm;
		var __control;
		var __parameter;
		var __value;

		var params = requestObj.getParams();
		if (params) {
			if (params.element != null) __elm = params.element;
			if (params.control != null) __control = params.control;
			if (params.params != null) __parameter = params.params;
			if (params.value != null) __value = params.value;
		}

		try {
			if ((__control!=null)&&(__parameter!=null)&&(__value!=null)) {
				if (__elm) {
					__elm.mojoControllers[__control].setValue(__parameter, __value);
				} else {
					requestObj.getController().getContextController(__control).setValue(__parameter, __value);
				}
			}
		} catch(err) {}


	},

	onResponse: function() {
	},

	onError: function() {
	}
});
dojo.provide("stdlib.command.ValidateRulesCommand");
dojo.require("mojo.command.Command");
dojo.require("mojo.helper.Validation");
dojo.require("mojo.helper.view.Error");
dojo.require("mojo.query");

dojo.declare("stdlib.command.ValidateRulesCommand", mojo.command.Command, {
	_targetElement: null, // error messages will appear INSIDE the target (container) element
	_checkAll: true,
	_output: function(errorList, targetElement) {
		
	},
	execute: function(requestObj) {

		var rules;
		var formSet;
		var params = requestObj.getParams();
		if (params) {
			if (params.targetElement != null) this._targetElement = params.targetElement;
			if (params.checkAll != null) this._checkAll = params.checkAll;
			if (params.rules != null) rules = params.rules;
			if (params.formSet != null) formSet = params.formSet;
		}

		if (rules) {
			if (this._targetElement != null) {
				this._targetElement.innerHTML = "";
				if (formSet) {
					var clearTags = ["label","inputs","textarea","select"];
					for (var i = 0; i < clearTags.length; i++) {
						var Tag = mojo.query(clearTags[i], formSet);
						for (var j = 0; j < Tag.length; j++) {
							dojo.removeClass(Tag[j], "error");
						}
					}
				}
			}
			if (typeof(rules) == "string") {
				dojo.require(rules);
				eval("requestObj.getParams().rules = " + rules);
			}
			var val = mojo.helper.Validation.getInstance();
			if ((formSet)&&(this._checkAll)) {
				var errorList = val.execute(requestObj.getParams().rules, formSet);
			} else {
				var errorList = val.execute(requestObj.getParams().rules, [requestObj.callerObj]);

			}
			if (errorList.length > 0) {
				if (this._targetElement != null) {
					mojo.helper.view.Error.showElementErrors(errorList, this._targetElement);
					for (var i=0; i<errorList.length; i++) {
						dojo.addClass(errorList[i].element, "error");
						if (errorList[i].element.parentNode.tagName == "LABEL") dojo.addClass(errorList[i].element.parentNode, "error");
					}
				} else {
				//	mojo.helper.view.Error.showElementErrors(errorList)
					for (var i = 0, len = errorList.length; i < len; i++) {
						var error = errorList[i];
						var err = document.createElement("span");
						err.className = "mojoValidationError";
						err.innerHTML = error.message;

						if(error.element.type == "checkbox") {
							if(error.element.parentNode.tagName == "LABEL") {
								dojo.place(err, error.element.parentNode, 'after');
							} else {
								dojo.place(err, error.element, 'after');
							}
						} else {
							dojo.place(err, error.element, 'after');
						}

						
					}
				}
				this.onError();
			} else if (requestObj.invocation) {
				this.onResponse();
				requestObj.invocation.proceed();
			}
		} else {
			console.debug("ERROR stdlib.command.ValidateRulesCommand - No rules passed");
		}
	},
	onResponse: function() {
	},
	onError: function() {
	}
});

/* 
	Class: stdlib.command.GenericServiceCommand
	Author: Jaime Bueza
	
	Provides a generic command that can be used against a service.
	
	Parameters:
		serviceName - {String}
		serviceLocator - {String}
		serviceParams - {Object}
		model - {String}
		
	Example:
		(start code)
			this.addObserver("a.login", "onclick", "GenericServiceCommand", function(context, caller) {
				return {
					serviceName: "LoginService",
					serviceLocator: "app.service.Locator",
					serviceParams: {
						username: mojo.queryFirst("input[name='username']", context).value,
						password: mojo.queryFirst("input[name='password']", context).value
					},
					model: "member.login"
				};
			});
		(end)
*/
dojo.provide("stdlib.command.GenericServiceCommand");
dojo.require("mojo.command.Command");
dojo.declare("stdlib.command.GenericServiceCommand", mojo.command.Command, {
	_model: null,
	execute: function(requestObj) {
		var params = requestObj.getParams();
		//Warn the developer if we're not passing any parameters to the Generic Service Command.
		if(!params) {
			//console.log("stdlib.command.GenericServiceCommand - Warning - No params passed.");
		}
		
		//Set the command's model so that we can access the reference in the onResponse/onError events.
		this._model = params.model;
		//Fetch the application specific service locator.
		dojo.require(params.serviceLocator);
		//Invoke the service
		(eval(params.serviceLocator)).getInstance().getService(params.serviceName).invoke(params.serviceParams, this);
	},
	onResponse: function(data) {
		if(this._model) mojo.Model.set(this._model, data); //If we have a model to set, then we can set it here.
	},
	onError: function(errors) {
		if(this._model) mojo.Model.set(this._model + ".errors", errors);
	}
});


/* 
	Class: stdlib.behavior.PreventDefaultEventBehavior
	Author: Steven Luscher, Chad Oakenfold
	
	Attempts to stop the default event
*/
dojo.provide("stdlib.behavior.PreventDefaultEventBehavior");
dojo.require("mojo.command.Command");
dojo.declare("stdlib.behavior.PreventDefaultEventBehavior", mojo.command.Command, 
{
	execute: function(requestObj) {
	  /* Cancel the default event if possible */
    try {	
	 		var e = requestObj.eventObj;
			if (e["preventDefault"]) e.preventDefault();
			if (e["stopPropagation"]) e.stopPropagation();
			e.returnValue = false;
			return false;	  
		} catch(e) {}
  }
});
/* 
	Class: stdlib.behavior.PlaySoundBehavior
*/
dojo.provide("stdlib.behavior.PlaySoundBehavior");
dojo.declare("stdlib.behavior.PlaySoundBehavior", mojo.command.Behavior, 
{
	execute: function(requestObj) {
    var params = requestObj.getParams();
    params.audio.play();
  }
});

