//----------------------------------------------------------------------------------
//
// CRunStringTokenizer
//
//----------------------------------------------------------------------------------
this.StringTokenizer = CRunStringTokenizer;

CRunStringTokenizer.CND_LAST = 0;
CRunStringTokenizer.ACT0_SPLITSTRING0WITHDELIMITERS11D = 0;
CRunStringTokenizer.ACT1_SPLITSTRING0WITHDELIMITERS1AND22D = 1;
CRunStringTokenizer.EXP0_ELEMENTCOUNT = 0;
CRunStringTokenizer.EXP1_ELEMENT = 1;
CRunStringTokenizer.EXP2_ELEMENT2D = 2;
CRunStringTokenizer.EXP3_ELEMENTCOUNTX = 3;
CRunStringTokenizer.EXP4_ELEMENTCOUNTY = 4;

function CRunStringTokenizer()
{
	this.Initialised = false;
	this.Tokens = null;
	this.Tokens2D = null;
}
CRunStringTokenizer.prototype = CServices.extend(new CRunExtension(),
	{
		getNumberOfConditions: function ()
		{
			return CRunStringTokenizer.CND_LAST;
		},

		createRunObject: function (file, cob, version)
		{
			this.Tokens = new CArrayList();
			this.Tokens2D = new CArrayList();
			return false;
		},

		// Actions
		// -------------------------------------------------
		action:          function (num, act)
		{
			switch (num)
			{
				case 0: // '\0'
					this.act0_Splitstring0withdelimiters11D(act);
					break;

				case 1: // '\001'
					this.act1_Splitstring0withdelimiters1and22D(act);
					break;
			}
		},

		act0_Splitstring0withdelimiters11D: function (act)
		{
			var param0 = act.getParamExpString(this.rh, 0);
			var param1 = act.getParamExpString(this.rh, 1);
			this.Tokens.clear();
			var Tokenizer = new CTokenizer(param0, param1);
			var TokenCount = Tokenizer.countTokens();
			var i;
			for (i = 0; i < TokenCount; i++)
			{
				this.Tokens.add(Tokenizer.nextToken());
			}
		},

		act1_Splitstring0withdelimiters1and22D: function (act)
		{
			var param0 = act.getParamExpString(this.rh, 0);
			var param1 = act.getParamExpString(this.rh, 1);
			var param2 = act.getParamExpString(this.rh, 2);
			this.Tokens2D.clear();
			var XTokenizer = new CTokenizer(param0, param1);
			var XTokenCount = XTokenizer.countTokens();
			var x;
			for (x = 0; x < XTokenCount; x++)
			{
				var New = new CArrayList();
				var YTokenizer = new CTokenizer(XTokenizer.nextToken(), param2);
				var YTokenCount = YTokenizer.countTokens();
				var y;
				for (y = 0; y < YTokenCount; y++)
				{
					New.add(YTokenizer.nextToken());
				}
				this.Tokens2D.add(New);
			}
		},

		expression: function (num)
		{
			switch (num)
			{
				case 0: // '\0'
					return this.exp0_ElementCount();

				case 1: // '\001'
					return this.exp1_Element();

				case 2: // '\002'
					return this.exp2_Element2D();

				case 3: // '\003'
					return this.exp3_ElementCountX();

				case 4: // '\004'
					return this.exp4_ElementCountY();
			}
			return 0;
		},

		exp0_ElementCount: function ()
		{
			return (this.Tokens.size());
		},

		exp1_Element: function ()
		{
			var param0 = this.ho.getExpParam();
			var s = this.Tokens.get(param0);
			if (s == null)
			{
				s = "";
			}
			return s;
		},

		exp2_Element2D: function ()
		{
			var param0 = this.ho.getExpParam();
			var param1 = this.ho.getExpParam();
			var s = this.Tokens2D.get(param0).get(param1);
			if (s == null)
			{
				s = "";
			}
			return s;
		},

		exp3_ElementCountX: function ()
		{
			return (this.Tokens2D.size());
		},

		exp4_ElementCountY: function ()
		{
		    var param0 = this.ho.getExpParam();
		    if ( param0 >= 0 && param0 < this.Tokens2D.size() )
		        return this.Tokens2D.get(param0).size();
		    return 0;
		}
	});

