// This shader was made for Five Nights at Candy's Remastered
// by Emil "Ace" Macko

sampler2D img : register(s0);
sampler2D bg : register(s1);

float4 ps_main(in float2 texCoord : TEXCOORD0) : COLOR0
{
	float4 b = tex2D(bg, texCoord);
	float4 a = tex2D(img, texCoord);
	float4 c;
	
	if(a.r > 0.5)
	{
		c.r = 2.0*a.r*b.r;
	}
	else c.r = 1.0 - 2.0*(1.0-a.r)*(1.0-b.r);
	
	if(a.g > 0.5)
	{
		c.g = 2.0*a.g*b.g;
	}
	else c.g = 1.0 - 2.0*(1.0-a.g)*(1.0-b.g);
	
	if(a.b > 0.5)
	{
		c.b = 2.0*a.b*b.b;
	}
	else c.b = 1.0 - 2.0*(1.0-a.b)*(1.0-b.b);
	/*
	if(a.a > 0.5)
	{
		c.a = 2.0*a.a*b.a;
	}
	else c.a = 1.0 - 2.0*(1.0-a.a)*(1.0-b.a);
	*/
	c.a = 1.0;
	
	return c;
}

technique tech_main
{
	pass P0
	{
		VertexShader = NULL;
		PixelShader = compile ps_2_a ps_main();
	}	
}