/*
	Class: stdlib.controller.TemplateController
 	
	A re-usable controller class that is used to create client-side templates using TrimPath syntax, and bind the data to a Mojo Model source. More information on Trimpath can be found at: http://code.google.com/p/trimpath/wiki/JavaScriptTemplates
	
	Example:
		(start code)
		SiteMap Example:
		{
			pattern: ".mojoTemplate",
			controllers: [
				{controller: "stdlib.controller.TemplateController"}
			]
		}
		
		Markup Example:
		<div class="mojoTemplate" modelSource="profileData">
			<p>
				<strong>Name:</strong><br/>
				${name} <!-- trimpath templating syntax -->
			</p>
			<p>
				<strong>Email:</strong><br/>
				${email} <!-- trimpath templating syntax -->
			</p>
			<p>
				<strong>Bio:</strong><br/>
				${bio} <!-- trimpath templating syntax -->
		</p>
		</div>		
		(end)

*/
dojo.provide("stdlib.controller.TemplateController");
dojo.require("mojo.controller.Controller");
dojo.require("extLib.trimpath.template");
dojo.require("mojo.Model");

dojo.declare("stdlib.controller.TemplateController", mojo.controller.Controller, 
{
	modelSource: "",
	_modelSourceHandle: null,
	templateObj: null,
	escapeQuotes: false,
	escapeHtml: false,
	onInit: function() {
		var context = this.getContextElement();
		var templateHTML = this._normalize(context.innerHTML);
		this.templateObj = TrimPath.parseTemplate(templateHTML);
		dojo.style(this.getContextElement(), 'display', 'none');
		this.setModelSource(context.getAttribute("modelsource"));
	},
	getModelSource: function() {
		if(!this.modelSource) {
			return "";
		}
		return this.modelSource;
	},
	setModelSource: function(modelSource) {
		if (this._modelSourceHandle) {
			mojo.Model.removeObserver(this._modelSourceHandle);
		}
		this.modelSource = modelSource;
		this._modelSourceHandle = mojo.Model.addObserver(this.modelSource, this, "onModelUpdate");
		this.onModelUpdate();
	},
	onModelUpdate: function() {
		this._bindToModel();
	},
	_bindToModel: function() {
		var modifiers = {
			escapeQuotes: function(str) {
				str = str.toString();
				str = str.replace(/\"/g, "&#34;");
				str = str.replace(/\'/g, "&#39;");
				return str;
			}
		};
		var sModel = this.getModelSource();
		if (sModel.length > 0 && mojo.Model.contains(sModel) && this.getContextElement()) {
			var modelData = mojo.Model.get(sModel);
			var result = new Array();
			if (!dojo.isArray(modelData)) {
				modelData = [modelData];
			}
			var modelDataLength = modelData.length;

			for (var i = 0, len = modelDataLength; i < len; i++) {
				if (modelData[i]) {
					if (typeof(modelData[i]) != "object") {
						var tmpModelData = modelData[i].toString();
						modelData[i] = new Object();
						modelData[i].data = tmpModelData;
					}
					modelData[i].currentIndex = i;
					modelData[i].totalLength = len;
					if(this.escapeQuotes) {
						modelData[i]._MODIFIERS = modifiers;
						modelData[i].content = modifiers.escapeQuotes(modelData[i].content);
					}
					result.push(this.templateObj.process(modelData[i]));
				}
			}
			var templateNode = this.getContextElement();
			var content = result.join("");

			templateNode.innerHTML = "";
			templateNode.innerHTML = content;
			dojo.style(this.getContextElement(), 'display', 'block');
		} else {
			dojo.style(this.getContextElement(), 'display', 'none');
		}
	},
	_normalize: function(templateStr) {
		var pattern = /[\!|\$]\{[^\}]*\}/g;
		var matchResult = templateStr.match(pattern);
		var splitResult = templateStr.split(pattern);
		var result = new Array();
		var resultLength = 0;
		if (matchResult) {
			resultLength = matchResult.length;
		}
		for (var i = 0; i < resultLength; i++) {
			result.push(splitResult[i]);
			var npattern = "$" + matchResult[i].substring(1);
			var modifiers = "";
			if (this.escapeHtml) {
				modifiers += "|escape";
			}
			if (this.escapeQuotes) {
				modifiers += "|escapeQuotes";
			}

			npattern = npattern.substring(0, npattern.length-1) + modifiers + "}";
			result.push(npattern);
		}

		result.push(splitResult[resultLength]);
		return result.join("");
	},
	addObservers: function() {		
	},
	addCommands: function() {
	},
	addIntercepts: function() {

	}
});