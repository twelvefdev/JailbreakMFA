//----------------------------------------------------------------------------------
//
// Facebook (Stephen)
//
//----------------------------------------------------------------------------------

CRunFacebook.CND0_LOGINSUCCESSFUL = 0;
CRunFacebook.CND1_LOGINNOTSUCCESSFUL = 1;
CRunFacebook.CND2_PERMISSIONALLOWED = 2;
CRunFacebook.CND3_PERMISSIONNOTALLOWED = 3;
CRunFacebook.CND4_USERISLOGGEDIN = 4;
CRunFacebook.CND5_POSTSUCCESSFUL = 5;
CRunFacebook.CND6_POSTNOTSUCCESSFUL = 6;
CRunFacebook.CND7_ONERROR = 7;
CRunFacebook.CND_LAST = 8;

CRunFacebook.ACT0_SETAPPLICATIONID0 = 0;
CRunFacebook.ACT1_LOGIN0 = 1;
CRunFacebook.ACT2_LOGOUT = 2;
CRunFacebook.ACT3_POSTMESSAGETOWALL012 = 3;
CRunFacebook.ACT4_POSTLINKTOWALL0123 = 4;
CRunFacebook.ACT5_POSTPICTURETOWALL01 = 5;
CRunFacebook.ACT6_POSTVIDEOTOWALL01 = 6;

CRunFacebook.EXP0_ID = 0;
CRunFacebook.EXP1_NAME = 1;
CRunFacebook.EXP2_FIRSTNAME = 2;
CRunFacebook.EXP3_LASTNAME = 3;
CRunFacebook.EXP4_LINK = 4;
CRunFacebook.EXP5_BIRTHDAY = 5;
CRunFacebook.EXP6_GENDER = 6;
CRunFacebook.EXP7_TIMEZONE = 7;
CRunFacebook.EXP8_LOCATION = 8;
CRunFacebook.EXP9_USERNAME = 9;
CRunFacebook.EXP10_THIRDPARTYID = 10;
CRunFacebook.EXP11_UPDATEDTIME = 11;
CRunFacebook.EXP12_ABOUT = 12;
CRunFacebook.EXP13_BIO = 13;
CRunFacebook.EXP14_EMAIL = 14;
CRunFacebook.EXP15_HOMETOWN = 15;
CRunFacebook.EXP16_INTERESTEDIN = 16;
CRunFacebook.EXP17_POLITICAL = 17;
CRunFacebook.EXP18_QUOTES = 18;
CRunFacebook.EXP19_RELATIONSHIPSTATUS = 19;
CRunFacebook.EXP20_SIGNIFICANTOTHER = 20;
CRunFacebook.EXP21_WEBSITE = 21;
CRunFacebook.EXP22_VERIFIED = 22;
CRunFacebook.EXP23_LASTERROR = 23

this.Facebook = CRunFacebook;
/* export to extension loader */

function CRunFacebook()
{
	//Extension Vars
	this.appID = "";
	this.isLoggedIn = 0;
	this.loginSuccessful = 0;
	this.loginNotSuccessful = 0;
	this.permissionAllowed = 0;
	this.permissionNotAllowed = 0;
	this.postSuccessful = 0;
	this.postNotSuccessful = 0;
	this.lastError = "No Errors.";
	this.errorOccurred = 0;
	this.id = "";
	this.name = "";
	this.firstName = "";
	this.lastName = "";
	this.link = "";
	this.birthday = "";
	this.gender = "";
	this.timezone = 0;
	this.location = "";
	this.userName = "";
	this.thirdPartyID = "";
	this.updatedTime = "";
	this.about = "";
	this.bio = "";
	this.email = "";
	this.hometown = "";
	this.interestedIn = "";
	this.political = "";
	this.quotes = "";
	this.relationshipStatus = "";
	this.significantOther = "";
	this.website = "";
	this.verified;
};

CRunFacebook.prototype = CServices.extend(new CRunExtension(),
	{
		getNumberOfConditions: function ()
		{
			return CND_LAST;
		},

		createRunObject: function (file, cob, version)
		{
			return true;
		},

		condition:            function (num, cnd)
		{
			switch (num)
			{
				case CND0_LOGINSUCCESSFUL:
					return cnd0_LoginSuccessful();
				case CND1_LOGINNOTSUCCESSFUL:
					return cnd1_LoginNotSuccessful();
				case CND2_PERMISSIONALLOWED:
					return cnd2_PermissionAllowed();
				case CND3_PERMISSIONNOTALLOWED:
					return cnd3_PermissionNotAllowed();
				case CND4_USERISLOGGEDIN:
					return cnd4_UserIsLoggedIn();
				case CND5_POSTSUCCESSFUL:
					return cnd5_PostSuccessful();
				case CND6_POSTNOTSUCCESSFUL:
					return cnd6_PostNotSuccessful();
				case CND7_ONERROR:
					return cnd7_OnError();
			}
			return false;
		},

		// Actions
		// -------------------------------------------------
		action:               function (num, act)
		{
			switch (num)
			{
				case ACT0_SETAPPLICATIONID0:
					act0_SetApplicationID0(act.getParamExpString(rh, 0));
					break;
				case ACT1_LOGIN0:
					act1_Login0(act.getParamExpString(rh, 0));
					break;
				case ACT2_LOGOUT:
					act2_Logout();
					break;
				case ACT3_POSTMESSAGETOWALL012:
					act3_PostMessageToWall012(act.getParamExpString(rh, 0), act.getParamExpString(rh, 1), act.getParamExpString(rh, 2));
					break;
				case ACT4_POSTLINKTOWALL0123:
					act4_PostLinkToWall0123(act.getParamExpString(rh, 0), act.getParamExpString(rh, 1), act.getParamExpString(rh, 2), act.getParamExpString(rh, 3));
					break;
				case ACT5_POSTPICTURETOWALL01:
					act5_PostPictureToWall01(act.getParamExpString(rh, 0), act.getParamExpString(rh, 1));
					break;
				case ACT6_POSTVIDEOTOWALL01:
					act6_PostVideoToWall01(act.getParamExpString(rh, 0), act.getParamExpString(rh, 1));
					break;
			}
		},

		// Expressions
		// -------------------------------------------------
		expression:           function (num)
		{
			switch (num)
			{
				case EXP0_ID:
					return exp0_ID();
				case EXP1_NAME:
					return exp1_Name();
				case EXP2_FIRSTNAME:
					return exp2_FirstName();
				case EXP3_LASTNAME:
					return exp3_LastName();
				case EXP4_LINK:
					return exp4_Link();
				case EXP5_BIRTHDAY:
					return exp5_Birthday();
				case EXP6_GENDER:
					return exp6_Gender();
				case EXP7_TIMEZONE:
					return exp7_Timezone();
				case EXP8_LOCATION:
					return exp8_Location();
				case EXP9_USERNAME:
					return exp9_UserName();
				case EXP10_THIRDPARTYID:
					return exp10_ThirdPartyID();
				case EXP11_UPDATEDTIME:
					return exp11_UpdatedTime();
				case EXP12_ABOUT:
					return exp12_About();
				case EXP13_BIO:
					return exp13_Bio();
				case EXP14_EMAIL:
					return exp14_EMail();
				case EXP15_HOMETOWN:
					return exp15_Hometown();
				case EXP16_INTERESTEDIN:
					return exp16_InterestedIn();
				case EXP17_POLITICAL:
					return exp17_Political();
				case EXP18_QUOTES:
					return exp18_Quotes();
				case EXP19_RELATIONSHIPSTATUS:
					return exp19_RelationshipStatus();
				case EXP20_SIGNIFICANTOTHER:
					return exp20_SignificantOther();
				case EXP21_WEBSITE:
					return exp21_Website();
				case EXP22_VERIFIED:
					return exp22_Verified();
				case EXP23_LASTERROR:
					return exp23_LastError();
			}
			return (0);
		},

		//Conditions Start
		cnd0_LoginSuccessful: function ()
		{
			if (this.loginSuccessful == 1)
			{
				//loginNotSuccessful = 0;
				return true;
			}
			else
			{
				return false;
			}
			return false;
		},

		cnd1_LoginNotSuccessful: function ()
		{
			if (this.loginNotSuccessful == 1)
			{
				//loginSuccessful = 0;
				return true;
			}
			else
			{
				return false;
			}
			return false;
		},

		cnd2_PermissionAllowed: function ()
		{
			if (this.permissionAllowed == 1)
			{
				//permissionAllowed = 0;
				return true;
			}
			else
			{
				return false;
			}
			return false;
		},

		cnd3_PermissionNotAllowed: function ()
		{
			if (this.permissionNotAllowed == 1)
			{
				//permissionNotAllowed = 0;
				return true;
			}
			else
			{
				return false;
			}
			return false;
		},

		cnd4_UserIsLoggedIn: function ()
		{
			if (this.isLoggedIn == 1)
			{
				return true;
			}
			else
			{
				return false;
			}
			return false;
		},

		cnd5_PostSuccessful: function ()
		{
			if (this.postSuccessful == 1)
			{
				this.postSuccessful = 0;
				return true;
			}
			else
			{
				return false;
			}
			return false;
		},

		cnd6_PostNotSuccessful: function ()
		{
			if (this.postNotSuccessful == 1)
			{
				this.postNotSuccessful = 0;
				return true;
			}
			else
			{
				return false;
			}
			return false;
		},

		cnd7_OnError: function ()
		{
			if (this.errorOccurred == 1)
			{
				this.errorOccurred = 0;
				return true;
			}
			else
			{
				return false;
			}
			return false;
		},

		//Facebook crap
		handleInit:   function (result, fail)
		{
			if (result)
			{
				//Arrived Logged In
				this.isLoggedIn = 1;
				this.ho.pushEvent(CND4_USERISLOGGEDIN, 0);
			}
			else
			{
				//Arrived Logged Out
				this.isLoggedIn = 0;
				this.ho.pushEvent(CND4_USERISLOGGEDIN, 0);
			}
		},

		onLogin: function (result, fail)
		{
			if (result)
			{//Logged In Already
				//Facebook.api("/me", api_getMeHandler);

				this.loginSuccessful = 1;
				this.ho.pushEvent(CND0_LOGINSUCCESSFUL, 0);
				this.permissionAllowed = 1;
				this.ho.pushEvent(CND2_PERMISSIONALLOWED, 0);
			}
			else
			{//Not Logged In Yet

				this.loginNotSuccessful = 1;
				this.ho.pushEvent(CND1_LOGINNOTSUCCESSFUL, 0);
				this.permissionNotAllowed = 1;
				this.ho.pushEvent(CND3_PERMISSIONNOTALLOWED, 0);
			}
		},

		onLogout:         function (result, fail)
		{
			if (result)
			{
				//Logged Out
				this.loginNotSuccessful = 1;
				this.loginSuccessful = 0;
				this.permissionNotAllowed = 0;
				this.permissionAllowed = 0;
			}
			else
			{
				//Wtf?
			}
		},

		//The API Me Calls
		api_getMeHandler: function (result, fail)
		{
			//Get User UserName
			if (result.username != null)
			{
				this.userName = result.username;
			}
			else
			{
				this.userName = "";
			}

			//Get User ID
			if (result.id != null)
			{
				this.id = result.id;
			}
			else
			{
				this.id = "";
			}

			//Get User Name
			if (result.name != null)
			{
				this.name = result.name;
			}
			else
			{
				this.name = "";
			}

			//Get User First Name
			if (result.first_name != null)
			{
				this.firstName = result.first_name;
			}
			else
			{
				this.firstName = "";
			}

			//Get User Last Name
			if (result.last_name != null)
			{
				this.lastName = result.last_name;
			}
			else
			{
				this.lastName = "";
			}

			//Get User Link
			if (result.link != null)
			{
				this.link = result.link;
			}
			else
			{
				this.link = "";
			}

			//Get User Birthday
			if (result.birthday != null)
			{
				this.birthday = result.birthday;
			}
			else
			{
				this.birthday = "";
			}

			//Get User Gender
			if (result.gender != null)
			{
				this.gender = result.gender;
			}
			else
			{
				this.gender = "";
			}

			//Get User Timezone
			if (result.timezone != null)
			{
				this.timezone = result.timezone;
			}
			else
			{
				this.timezone = 0;
			}

			//Get User Location
			if (result.locale != null)
			{
				this.location = result.locale;
			}
			else
			{
				this.location = "";
			}

			//Get User Third Party ID
			if (result.third_party_id != null)
			{
				this.thirdPartyID = result.third_party_id;
			}
			else
			{
				this.thirdPartyID = "";
			}

			//Get User Updated Time
			if (result.updated_time != null)
			{
				this.updatedTime = result.updated_time;
			}
			else
			{
				this.updatedTime = "";
			}

			//Get User About
			if (result.about != null)
			{
				this.about = result.about;
			}
			else
			{
				this.about = "";
			}

			//Get User BIO
			if (result.bio != null)
			{
				this.bio = result.bio;
			}
			else
			{
				this.bio = "";
			}

			//Get User Email
			if (result.email != null)
			{
				this.email = result.email;
			}
			else
			{
				this.email = "";
			}

			//Get User Hometown
			if (result.hometown != null)
			{
				this.hometown = result.hometown;
			}
			else
			{
				this.hometown = "";
			}

			//Get User Interested In
			if (result.interested_in != null)
			{
				this.interestedIn = result.interested_in;
			}
			else
			{
				this.interestedIn = "";
			}

			//Get User Political
			if (result.political != null)
			{
				this.political = result.political;
			}
			else
			{
				this.political = "";
			}

			//Get User Quotes
			if (result.quotes != null)
			{
				this.quotes = result.quotes;
			}
			else
			{
				this.quotes = "";
			}

			//Get User Relationship Status
			if (result.relationship_status != null)
			{
				this.relationshipStatus = result.relationship_status;
			}
			else
			{
				this.relationshipStatus = "";
			}

			//Get User Significant Other
			if (result.significant_other != null)
			{
				this.significantOther = result.significant_other;
			}
			else
			{
				this.significantOther = "";
			}

			//Get User Website
			if (result.website != null)
			{
				this.website = result.website;
			}
			else
			{
				this.website = "";
			}

			//Get User Verified
			if (result.verified != null)
			{
				this.verified = result.verified;
			}
			else
			{
				this.verified = 0;
			}
		},

		publishPostResult:      function (result, fail)
		{
			if (result)
			{
				//Success
				this.postSuccessful = 1;
				this.ho.pushEvent(CND5_POSTSUCCESSFUL, 0);
			}
			else
			{
				//Fail
				this.errorOccurred = 1;
				this.lastError = "Last post failed with an unknown error.";
				this.postNotSuccessful = 1;
				this.ho.pushEvent(CND6_POSTNOTSUCCESSFUL, 0);
			}
		},

		//Actions Start
		act0_SetApplicationID0: function (param0)
		{
			this.appID = param0;
			Facebook.init(appID, handleInit);
		},

		act1_Login0: function (param0)
		{
			Facebook.login(onLogin, {perms: param0});
		},

		act2_Logout: function ()
		{
			Facebook.logout(onLogout);
		},

		act3_PostMessageToWall012: function (param0, param1, param2)
		{
			var actionsobject = new Object();
			actionsobject.name = param1; //think this is limited in characters
			actionsobject.link = param2;
			var myactions = com.adobe.serialization.json.JSON.encode(actionsobject);

			if (param1 != "")
			{
				Facebook.api("/me/feed", publishPostResult, {message: param0, actions: myactions}, "POST");
			}
			else
			{
				Facebook.api("/me/feed", publishPostResult, {message: param0}, "POST");
			}
			//message: picture: (link: name: caption: description:) source:
		},

		act4_PostLinkToWall0123: function (param0, param1, param2, param3)
		{
			Facebook.api("/me/feed", publishPostResult, {link: param0, name: param1, caption: param2, description: param3}, "POST");
		},

		act5_PostPictureToWall01: function (param0, param1)
		{
			Facebook.api("/me/feed", publishPostResult, {picture: param0, message: param1}, "POST");
		},

		act6_PostVideoToWall01: function (param0, param1)
		{
			Facebook.api("/me/feed", publishPostResult, {source: param0, message: param1}, "POST");
		},

		//Expressions Start
		exp0_ID:                function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(id);
			return e;
		},

		exp1_Name: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(name);
			return e;
		},

		exp2_FirstName: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(firstName);
			return e;
		},

		exp3_LastName: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(lastName);
			return e;
		},

		exp4_Link: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(link);
			return e;
		},

		exp5_Birthday: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(birthday);
			return e;
		},

		exp6_Gender: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(gender);
			return e;
		},

		exp7_Timezone: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceDouble(timezone);
			return e;
		},

		exp8_Location: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(location);
			return e;
		},

		exp9_UserName: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(userName);
			return e;
		},

		exp10_ThirdPartyID: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(thirdPartyID);
			return e;
		},

		exp11_UpdatedTime: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(updatedTime);
			return e;
		},

		exp12_About: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(about);
			return e;
		},

		exp13_Bio: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(bio);
			return e;
		},

		exp14_EMail: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(email);
			return e;
		},

		exp15_Hometown: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(this.hometown);
			return e;
		},

		exp16_InterestedIn: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(interestedIn);
			return e;
		},

		exp17_Political: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(political);
			return e;
		},

		exp18_Quotes: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(quotes);
			return e;
		},

		exp19_RelationshipStatus: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(relationshipStatus);
			return e;
		},

		exp20_SignificantOther: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(significantOther);
			return e;
		},

		exp21_Website: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);
			e.forceString(website);
			return e;
		},

		exp22_Verified: function ()
		{
			Facebook.api("/me", api_getMeHandler);

			var e = (0);

			if (verified == true)
			{
				e.forceInt(1);
				return e;
			}
			else
			{
				e.forceInt(0);
				return e;
			}
		},

		exp23_LastError: function ()
		{
			var e = (0);
			e.forceString(lastError);
			return e;
		}

	});