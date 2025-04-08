// This shader IS NOT FINISHED. You will have a tough time getting it to work properly!
// By Emil Macko

sampler2D bg : register(s1);
float hr;
float vr;
float hfov;
float vfov;
float z;
float ho;
float vo;
float to;
float to2;

float4 ps_main(in float2 texCoord : TEXCOORD0) : COLOR0	{
	
	float2 newCoord;
	float pi = 3.1415926535897932384626433832795;
	
	//	Zoom
	texCoord.x = (texCoord.x - 0.5) * z + 0.5;
	texCoord.y = (texCoord.y - 0.5) * z + 0.5;
	
	
	/*
		hfov	= Horizontal FOV angle of the whole background image (in degrees).
		vfov	= Vertical FOV angle of the whole background image (in degrees).
		hr		= The ratio between the widths of the view and the background image (in pixels).
		vr		= The ratio between the heights of the view and the background image (in pixels).
		ho		= The factor of the horizontal position of the view.
		vo		= The factor of the vertical position of the view, with respect to how much the view can move within the background image.
		z		= The amount to zoom the image in or out, measured in the amount of the image to show (lower values = zoomed in).
	*/
	
	
	
	float2 o;
	o.x = (hfov / 180.0) * pi;
	o.y = (vfov / 180.0) * pi;
	
	float aspect = 9.0 / 16.0;
	
	float2 fov;
	fov.y = o.y * vr; // 63.28125
	fov.x = atan(1.0 / (aspect / tan(fov.y / 2.0))) * 2.0; // 95.2153575004
	
	// Perspective lens width is	= 1
	// Perspective lens height is	= 9/16 = aspect
	float3 v;
	v.x = texCoord.x - 0.5 - (ho-0.5);				// Width	= -0.5 ... 0.5
	v.y = (texCoord.y - 0.5) * aspect - to2*(vo-0.5);	// Height	= -9/32 ... 9/32
	v.z = 0.5 / tan(fov.x / 2.0);		// Depth	= 0.912879745703 / 2
	
	
	// Rotate vector (View Pitch)
	float ta = (0.5 - vo) * (1.0 - vr) * o.y * 2.0; // Max rotation should be 13.3165 degrees up/down from center.
	float tz = v.z * cos(ta) - v.y * sin(ta);
	float ty = v.z * sin(ta) + v.y * cos(ta);
	v.z = tz;
	v.y = ty;
	
	
	// Convert to unit vector:
	float vLength = sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
	v /= vLength;
	
	float lon = atan(v.x / v.z); // Longitude
	
	float vz2 = v.x*sin(lon) + v.z*cos(lon);
	float lat = atan(v.y / vz2); // Latitude
	
	newCoord.x = lon / (o.x * hr) + 0.5;
	newCoord.y = lat / (o.y * vr) + to*tan((1.0-vr)*(vo-0.5)) + 0.5;
	
	
	// For image of 2048x1024, with FOV 180x90, and view 1280x720:
	// to	= 4.8
	// to2	= 0.41
	
	//	GET RID OF WRAPPING BEYOND BORDER
	if(newCoord.x < 0.0 || newCoord.y < 0.0 || newCoord.x > 1.0 || newCoord.y > 1.0)
	{
		return float4(0.0,0.0,0.0,1.0);
	}
	else return tex2D(bg, newCoord);
}

technique tech_main
{
	pass P0
	{
		VertexShader = NULL;
		PixelShader = compile ps_2_a ps_main();
	}	
}