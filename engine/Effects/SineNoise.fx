// This shader was made for something that some people might call FNAC 4.
// by Emil "Ace" Macko

sampler2D bg : register(s1);
float a,b,c,off,w;

float4 ps_main(in float2 texCoord : TEXCOORD0) : COLOR0	{
	
	off += texCoord.y;
	texCoord.x += (sin(off*a + 1.0) + sin(off*b + 2.0) + sin(off*c + 3.0)) * w;
	return tex2D(bg, texCoord);
}

technique tech_main
{
	pass P0
	{
		VertexShader = NULL;
		PixelShader = compile ps_2_0 ps_main();
	}	
}