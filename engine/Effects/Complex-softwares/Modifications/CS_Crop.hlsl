
// Pixel shader input structure
struct PS_INPUT
{
  float4 Tint : COLOR0;
  float2 texCoord : TEXCOORD0;
  float4 Position : SV_POSITION;
};

// Pixel shader output structure
struct PS_OUTPUT
{
    float4 Color   : SV_TARGET;
};

// Global variables
Texture2D<float4> Tex0 : register(t0);
sampler Tex0Sampler : register(s0);

cbuffer PS_VARIABLES : register(b0)
{
	float fL;
	float fR;
	float fT;
	float fB;
	float fA;
};

PS_OUTPUT ps_main( in PS_INPUT In )
{
    // Output pixel
    PS_OUTPUT Out;
    Out.Color = Tex0.Sample(Tex0Sampler, In.texCoord);
	
	if(In.texCoord.x<fL|| In.texCoord.x>1.0f-fR || In.texCoord.y<fT || In.texCoord.y>1.0f-fB)
	{
		Out.Color.a = Out.Color.a*fA;
	}
	Out.Color *= In.Tint;
	
    return Out;
}

PS_OUTPUT ps_main_pm( in PS_INPUT In )
{
    // Output pixel
    PS_OUTPUT Out;
    Out.Color = Tex0.Sample(Tex0Sampler, In.texCoord);
	
	if(In.texCoord.x<fL|| In.texCoord.x>1.0f-fR || In.texCoord.y<fT || In.texCoord.y>1.0f-fB)
	{
		Out.Color.rgb = Out.Color.rgb*fA;
	}
	Out.Color *= In.Tint;
	
    return Out;
}

