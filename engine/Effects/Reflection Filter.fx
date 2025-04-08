sampler2D bg : register(s1);
float fCoeff, Mode;

float4 ps_main(in float2 In : TEXCOORD0) : COLOR0
{
	if (Mode == 1){
		if (In.y < fCoeff){
			In.y = (- In.y / fCoeff) + In.y + 1;
		}
	}
	else if (Mode == 2){
		if (In.x < fCoeff){
			In.x = (- In.x / fCoeff) + In.x + 1;
		}
	}
	else if (Mode == 3){
		if (In.x > fCoeff){
			In.x = ((In.x - 1) * fCoeff) / (fCoeff - 1);
		}
	}
	else {
		if (In.y > fCoeff){
			In.y = ((In.y - 1) * fCoeff) / (fCoeff - 1);
		}
	}
	return tex2D(bg,In.xy);
}

technique tech_main { pass P0 { PixelShader  = compile ps_2_0 ps_main(); }}