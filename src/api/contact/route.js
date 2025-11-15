export async function POST(request) {
  try {
    const { email, request_type, message } = await request.json();

    // Validate required fields
    if (!email || !request_type || !message) {
      return new Response(
        JSON.stringify({ detail: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Here you would typically:
    // 1. Send an email
    // 2. Save to a database
    // 3. Integrate with a CRM
    // For now, we'll just log and return success

    console.log("Contact form submission:", {
      email,
      request_type,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully" }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Contact API error:", error);
    return new Response(
      JSON.stringify({ detail: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}