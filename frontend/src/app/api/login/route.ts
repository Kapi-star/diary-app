import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;   
    
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    if (response.ok) {      
      return NextResponse.json(data, { status: response.status });
    }

    // JWTをhttpOnly Cookieに保存
    const responseCookie = NextResponse.json(data, { status: 200 });
    responseCookie.cookies.set('token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return responseCookie;
  } catch (error) { 
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
