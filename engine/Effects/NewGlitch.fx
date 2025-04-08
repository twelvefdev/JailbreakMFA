// This shader was made for Five Nights at Candy's Remastered.
// by Emil "Ace" Macko

sampler2D img : register(s0);
float ro,go,bo; // Red Offset, Green Offset, Blue Offset.
int w,m; // Wrap, Mirror (Booleans)

float4 ps_main(in float2 texCoord : TEXCOORD0) : COLOR0
{
	if(m) texCoord.x = 1.0 - texCoord.x;
	
	float4 ct, co;
	float alpha = 0.0;
	ct = tex2D(img, float2((texCoord.x + ro)*w + clamp(texCoord.x + ro, 0, 1)*(1-w), texCoord.y));
	co.r = ct.r;
	alpha += ct.a;
	ct = tex2D(img, float2((texCoord.x + go)*w + clamp(texCoord.x + go, 0, 1)*(1-w), texCoord.y));
	co.g = ct.g;
	alpha += ct.a;
	ct = tex2D(img, float2((texCoord.x + bo)*w + clamp(texCoord.x + bo, 0, 1)*(1-w), texCoord.y));
	co.b = ct.b;
	alpha += ct.a;
	
	co.a = alpha / 3.0;
	
	return co;
}

technique tech_main
{
	pass P0
	{
		VertexShader = NULL;
		PixelShader = compile ps_2_a ps_main();
	}	
}