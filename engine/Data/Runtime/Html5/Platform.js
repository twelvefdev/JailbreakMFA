//----------------------------------------------------------------------------------
//
// CRunPlatform: Platform Movement object
//
//----------------------------------------------------------------------------------
this.Platform = CRunPlatform;

CRunPlatform.AID_ColObstacle = 0;
CRunPlatform.AID_ColJumpThrough = 1;
CRunPlatform.AID_SetObject = 2;
CRunPlatform.AID_MoveRight = 3;
CRunPlatform.AID_MoveLeft = 4;
CRunPlatform.AID_Jump = 5;
CRunPlatform.AID_SetXVelocity = 6;
CRunPlatform.AID_SetYVelocity = 7;
CRunPlatform.AID_SetMaxXVelocity = 8;
CRunPlatform.AID_SetMaxYVelocity = 9;
CRunPlatform.AID_SetXAccel = 10;
CRunPlatform.AID_SetXDecel = 11;
CRunPlatform.AID_SetGravity = 12;
CRunPlatform.AID_SetJumpStrength = 13;
CRunPlatform.AID_SetJumpHoldHeight = 14;
CRunPlatform.AID_SetStepUp = 15;
CRunPlatform.AID_JumpHold = 16;
CRunPlatform.AID_Pause = 17;
CRunPlatform.AID_UnPause = 18;
CRunPlatform.AID_SetSlopeCorrection = 19;
CRunPlatform.AID_SetAddXVelocity = 20;
CRunPlatform.AID_SetAddYVelocity = 21;
CRunPlatform.CID_ObstacleTest = 0;
CRunPlatform.CID_JumpThroughTest = 1;
CRunPlatform.CID_IsOnGround = 2;
CRunPlatform.CID_IsJumping = 3;
CRunPlatform.CID_IsFalling = 4;
CRunPlatform.CID_IsPaused = 5;
CRunPlatform.CID_IsMoving = 6;
CRunPlatform.EID_GetXVelocity = 0;
CRunPlatform.EID_GetYVelocity = 1;
CRunPlatform.EID_GetMaxXVelocity = 2;
CRunPlatform.EID_GetMaxYVelocity = 3;
CRunPlatform.EID_GetXAccel = 4;
CRunPlatform.EID_GetXDecel = 5;
CRunPlatform.EID_GetGravity = 6;
CRunPlatform.EID_GetJumpStrength = 7;
CRunPlatform.EID_GetJumpHoldHeight = 8;
CRunPlatform.EID_GetStepUp = 9;
CRunPlatform.EID_GetSlopeCorrection = 10;
CRunPlatform.EID_GetAddXVelocity = 11;
CRunPlatform.EID_GetAddYVelocity = 12;

function CRunPlatform()
{
	this.ObjFixed = 0;
	this.ObjShortCut = 0;
	this.Col = null;
	this.PFMove = null;
}
CRunPlatform.prototype = CServices.extend(new CRunExtension(),
	{
		getNumberOfConditions: function ()
		{
			return 7;
		},

		fixString: function (input)
		{
			var i;
			for (i = 0; i < input.length; i++)
			{
				if (input.charCodeAt(i) < 10)
				{
					return input.substring(0, i);
				}
			}
			return input;
		},

		createRunObject: function (file, cob, version)
		{
			file.setUnicode(false);
			file.skipBytes(8);
			this.PFMove = new CRunPlatformMove();
			this.PFMove.MaxXVelocity = CServices.floatToInt(parseFloat(this.fixString(file.readAString(16))));
			this.PFMove.MaxYVelocity = CServices.floatToInt(parseFloat(this.fixString(file.readAString(16))));
			this.PFMove.XAccel = CServices.floatToInt(parseFloat(this.fixString(file.readAString(16))));
			this.PFMove.XDecel = CServices.floatToInt(parseFloat(this.fixString(file.readAString(16))));
			this.PFMove.Gravity = CServices.floatToInt(parseFloat(this.fixString(file.readAString(16))));
			this.PFMove.JumpStrength = CServices.floatToInt(parseFloat(this.fixString(file.readAString(16))));
			this.PFMove.JumpHoldHeight = CServices.floatToInt(parseFloat(this.fixString(file.readAString(16))));
			this.PFMove.StepUp = CServices.floatToInt(parseFloat(this.fixString(file.readAString(16))));
			this.PFMove.SlopeCorrection = CServices.floatToInt(parseFloat(this.fixString(file.readAString(16))));
			this.Col = new CRunPlatformCOL();
			this.Col.JumpThroughColTop = file.readAByte() == 1 ? true : false;
			this.Col.EnableJumpThrough = file.readAByte() == 1 ? true : false;
			return true;
		},

		GetCObject: function (Fixed)
		{
			var pHo;
			for (pHo = this.ho.getFirstObject(); pHo != null; pHo = this.ho.getNextObject())
			{
				if (((pHo.hoCreationId << 16) + pHo.hoNumber) == Fixed)
				{
					return pHo;
				}
			}
			return null;
		},

		IsOverObstacle: function ()
		{
			this.Col.Obstacle = false;
			this.ho.generateEvent(CRunPlatform.CID_ObstacleTest, this.ho.getEventParam());
			return this.Col.Obstacle;
		},

		IsOverJumpThrough: function ()
		{
			if (!this.Col.EnableJumpThrough)
			{
				return false;
			}
			this.Col.JumpThrough = false;
			this.ho.generateEvent(CRunPlatform.CID_JumpThroughTest, this.ho.getEventParam());
			return this.Col.JumpThrough;
		},

		handleRunObject: function ()
		{
			var Object = this.GetCObject(this.ObjFixed);
			// If Object is valid, do movement
			if (!this.PFMove.Paused && Object != null)
			{
				if (this.PFMove.RightKey && !this.PFMove.LeftKey)
				{
					this.PFMove.XVelocity += this.PFMove.XAccel; // add to x velocity when pressing right
				}
				if (this.PFMove.LeftKey && !this.PFMove.RightKey)
				{
					this.PFMove.XVelocity -= this.PFMove.XAccel; // sub from x velocity when pressing left
				}
				if (this.PFMove.XVelocity != 0 && ((!this.PFMove.LeftKey && !this.PFMove.RightKey) || (this.PFMove.LeftKey && this.PFMove.RightKey)))
				{
					// slow the object down when not pressing right or left
					this.PFMove.XVelocity -= this.PFMove.XVelocity / Math.abs(this.PFMove.XVelocity) * this.PFMove.XDecel;
					if (this.PFMove.XVelocity <= this.PFMove.XDecel && this.PFMove.XVelocity >= 0 - this.PFMove.XDecel)
					{
						this.PFMove.XVelocity = 0; // set x velocity to 0 when it's close to 0
					}
				}
				/////////////////////////////////////////////////////////////////////////
				// MOVEMENT LOOPS
				// set velocitities to max and min
				this.PFMove.XVelocity = Math.min(Math.max(this.PFMove.XVelocity, 0 - this.PFMove.MaxXVelocity), this.PFMove.MaxXVelocity);
				this.PFMove.YVelocity = Math.min(Math.max(this.PFMove.YVelocity + this.PFMove.Gravity, 0 - this.PFMove.MaxYVelocity), this.PFMove.MaxYVelocity);
				var tmpXVelocity = this.PFMove.XVelocity + this.PFMove.AddXVelocity;
				var tmpYVelocity = this.PFMove.YVelocity + this.PFMove.AddYVelocity;
				this.PFMove.XMoveCount += Math.abs(tmpXVelocity);
				this.PFMove.YMoveCount += Math.abs(tmpYVelocity);

				// X MOVEMENT LOOP
				while (this.PFMove.XMoveCount > 100)
				{
					if (!this.IsOverObstacle())
					{
						Object.hoX += tmpXVelocity / Math.abs(tmpXVelocity);
					}

					if (this.IsOverObstacle())
					{
						var up;
						for (up = 0; up < this.PFMove.StepUp; up++) // Step up (slopes)
						{
							Object.hoY--;
							if (!this.IsOverObstacle())
							{
								break;
							}
						}
						if (this.IsOverObstacle())
						{
							Object.hoY += this.PFMove.StepUp;
							Object.hoX -= tmpXVelocity / Math.abs(tmpXVelocity);
							this.PFMove.XVelocity = this.PFMove.XMoveCount = 0;
						}
					}
					this.PFMove.XMoveCount -= 100;
					Object.roc.rcChanged = true;
				}

				// Y MOVEMENT LOOP
				while (this.PFMove.YMoveCount > 100)
				{
					if (!this.IsOverObstacle())
					{
						Object.hoY += tmpYVelocity / Math.abs(tmpYVelocity);
						this.PFMove.OnGround = false;
					}

					if (this.IsOverObstacle())
					{
						Object.hoY -= tmpYVelocity / Math.abs(tmpYVelocity);
						if (tmpYVelocity > 0)
						{
							this.PFMove.OnGround = true;
						}
						this.PFMove.YVelocity = this.PFMove.YMoveCount = 0;
					}

					if (this.IsOverJumpThrough() && tmpYVelocity > 0)
					{
						if (this.Col.JumpThroughColTop)
						{
							Object.hoY--;
							if (!this.IsOverJumpThrough())
							{
								Object.hoY -= tmpYVelocity / Math.abs(tmpYVelocity);
								this.PFMove.YVelocity = this.PFMove.YMoveCount = 0;
								this.PFMove.OnGround = true;
							}
							Object.hoY++;
						}
						else
						{
							Object.hoY -= tmpYVelocity / Math.abs(tmpYVelocity);
							this.PFMove.YVelocity = this.PFMove.YMoveCount = 0;
							this.PFMove.OnGround = true;
						}
					}
					this.PFMove.YMoveCount -= 100;
					Object.roc.rcChanged = true;

				}
				if (this.PFMove.SlopeCorrection > 0 && tmpYVelocity >= 0)
				{
					var tmp = false;
					// Slope correction
					var sc;
					for (sc = 0; sc < this.PFMove.SlopeCorrection; sc++)
					{
						Object.hoY++;
						if (this.IsOverObstacle())
						{
							Object.hoY--;
							this.PFMove.OnGround = true;
							tmp = true;
							break;
						}
					}
					if (tmp == false)
					{
						Object.hoY -= this.PFMove.SlopeCorrection;
					}
				}
			}
			// Reset values
			this.PFMove.RightKey = false;
			this.PFMove.LeftKey = false;
			return 0;
		},

		action: function (num, act)
		{
			switch (num)
			{
				case CRunPlatform.AID_ColObstacle:
					this.Col.Obstacle = true;
					break;
				case CRunPlatform.AID_ColJumpThrough:
					this.Col.JumpThrough = true;
					break;
				case CRunPlatform.AID_SetObject:
					this.SetObject(act.getParamObject(this.rh, 0));
					break;
				case CRunPlatform.AID_MoveRight:
					this.PFMove.RightKey = true;
					break;
				case CRunPlatform.AID_MoveLeft:
					this.PFMove.LeftKey = true;
					break;
				case CRunPlatform.AID_Jump:
					this.PFMove.YVelocity = 0 - this.PFMove.JumpStrength;
					break;
				case CRunPlatform.AID_SetXVelocity:
					this.PFMove.XVelocity = act.getParamExpression(this.rh, 0);
					break;
				case CRunPlatform.AID_SetYVelocity:
					this.PFMove.YVelocity = act.getParamExpression(this.rh, 0);
					break;
				case CRunPlatform.AID_SetMaxXVelocity:
					this.PFMove.MaxXVelocity = act.getParamExpression(this.rh, 0);
					break;
				case CRunPlatform.AID_SetMaxYVelocity:
					this.PFMove.MaxYVelocity = act.getParamExpression(this.rh, 0);
					break;
				case CRunPlatform.AID_SetXAccel:
					this.PFMove.XAccel = act.getParamExpression(this.rh, 0);
					break;
				case CRunPlatform.AID_SetXDecel:
					this.PFMove.XDecel = act.getParamExpression(this.rh, 0);
					break;
				case CRunPlatform.AID_SetGravity:
					this.PFMove.Gravity = act.getParamExpression(this.rh, 0);
					break;
				case CRunPlatform.AID_SetJumpStrength:
					this.PFMove.JumpStrength = act.getParamExpression(this.rh, 0);
					break;
				case CRunPlatform.AID_SetJumpHoldHeight:
					this.PFMove.JumpHoldHeight = act.getParamExpression(this.rh, 0);
					break;
				case CRunPlatform.AID_SetStepUp:
					this.PFMove.StepUp = act.getParamExpression(this.rh, 0);
					break;
				case CRunPlatform.AID_JumpHold:
					this.PFMove.YVelocity -= this.PFMove.JumpHoldHeight;
					break;
				case CRunPlatform.AID_Pause:
					this.PFMove.Paused = true;
					break;
				case CRunPlatform.AID_UnPause:
					this.PFMove.Paused = false;
					break;
				case CRunPlatform.AID_SetSlopeCorrection:
					this.PFMove.SlopeCorrection = act.getParamExpression(this.rh, 0);
					break;
				case CRunPlatform.AID_SetAddXVelocity:
					this.PFMove.AddXVelocity = act.getParamExpression(this.rh, 0);
					break;
				case CRunPlatform.AID_SetAddYVelocity:
					this.PFMove.AddYVelocity = act.getParamExpression(this.rh, 0);
					break;
			}
		},

		SetObject: function (object)
		{
			if (object != null)
			{
				this.ObjFixed = (object.hoCreationId << 16) + object.hoNumber;
			}
			else
			{
				this.ObjFixed = 0;
			}
		},

		condition: function (num, cnd)
		{
			switch (num)
			{
				case CRunPlatform.CID_ObstacleTest:
					return true;
				case CRunPlatform.CID_JumpThroughTest:
					return true;
				case CRunPlatform.CID_IsOnGround:
					return this.PFMove.OnGround;
				case CRunPlatform.CID_IsJumping:
					return (!this.PFMove.OnGround && this.PFMove.YVelocity <= 0);
				case CRunPlatform.CID_IsFalling:
					return (!this.PFMove.OnGround && this.PFMove.YVelocity > 0);
				case CRunPlatform.CID_IsPaused:
					return this.PFMove.Paused;
				case CRunPlatform.CID_IsMoving:
					return (Math.abs(this.PFMove.XVelocity) > 0);
			}
			return false;
		},

		expression: function (num)
		{
			switch (num)
			{
				case CRunPlatform.EID_GetXVelocity:
					return (this.PFMove.XVelocity);
				case CRunPlatform.EID_GetYVelocity:
					return (this.PFMove.YVelocity);
				case CRunPlatform.EID_GetMaxXVelocity:
					return (this.PFMove.MaxXVelocity);
				case CRunPlatform.EID_GetMaxYVelocity:
					return (this.PFMove.MaxYVelocity);
				case CRunPlatform.EID_GetXAccel:
					return (this.PFMove.XAccel);
				case CRunPlatform.EID_GetXDecel:
					return (this.PFMove.XDecel);
				case CRunPlatform.EID_GetGravity:
					return (this.PFMove.Gravity);
				case EID_GetJumpStrength:
					return (this.PFMove.JumpStrength);
				case CRunPlatform.EID_GetJumpHoldHeight:
					return (this.PFMove.JumpHoldHeight);
				case CRunPlatform.EID_GetStepUp:
					return (this.PFMove.StepUp);
				case CRunPlatform.EID_GetSlopeCorrection:
					return (this.PFMove.SlopeCorrection);
				case CRunPlatform.EID_GetAddXVelocity:
					return (this.PFMove.AddXVelocity);
				case CRunPlatform.EID_GetAddYVelocity:
					return (this.PFMove.AddYVelocity);
			}
			return (0);//won't be used
		}
	});

function CRunPlatformCOL()
{
	this.Obstacle = false;
	this.JumpThrough = false;
	this.JumpThroughColTop = false;
	this.EnableJumpThrough = false;
}
function CRunPlatformMove()
{
	this.XVelocity = 0;
	this.YVelocity = 0;
	this.MaxXVelocity = 0;
	this.MaxYVelocity = 0;
	this.AddXVelocity = 0;
	this.AddYVelocity = 0;
	this.XMoveCount = 0;
	this.YMoveCount = 0;
	this.XAccel = 0;
	this.XDecel = 0;
	this.Gravity = 0;
	this.JumpStrength = 0;
	this.JumpHoldHeight = 0;
	this.StepUp = 0;
	this.SlopeCorrection = 0;

	this.OnGround = false;
	this.RightKey = false;
	this.LeftKey = false;
	this.Paused = false;
}



	

