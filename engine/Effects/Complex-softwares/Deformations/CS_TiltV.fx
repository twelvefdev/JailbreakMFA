
// Pixel shader input structure
struct PS_INPUT
{
    float4 Position   : POSITION;
    float2 Texture    : TEXCOORD0;
};

// Pixel shader output structure
struct PS_OUTPUT
{
    float4 Color   : COLOR0;
};

// Global variables
sampler2D Tex0;

float fT;

PS_OUTPUT ps_main( in PS_INPUT In )
{
    // Output pixel
    PS_OUTPUT Out;
	float fCoeff = 1-abs(fT);
	
	if(fT>=0)
	{
		Out.Color = tex2D(Tex0, float2(In.Texture.x,(In.Texture.y-In.Texture.x*fT)/fCoeff));
	}
	else
	{
		Out.Color = tex2D(Tex0, float2(In.Texture.x,(In.Texture.y-In.Texture.x*fT+fT)/fCoeff));
	}
	
    return Out;
}

// Effect technique
technique tech_main
{
    pass P0
    {
        // shaders
        VertexShader = NULL;
        PixelShader  = compile ps_2_0 ps_main();
    }  
}