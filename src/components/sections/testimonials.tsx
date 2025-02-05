interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "CTO at TechFlow",
    content: "This template saved us weeks of development time. The integration between services is seamless.",
    avatar: "",
  },
  {
    name: "Michael Chen",
    role: "Founder, DataStack",
    content: "The best starter template I've used. Clean code, modern stack, and excellent documentation.",
    avatar: "",
  },
  {
    name: "Emma Williams",
    role: "Lead Developer",
    content: "Perfect balance of features and simplicity. Exactly what we needed for our MVP.",
    avatar: "",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Loved by Developers</h2>
          <p className="text-muted-foreground mt-2">Don't just take our word for it</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="p-6 bg-muted/50 rounded-lg">
              <div className="flex items-center mb-4">
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
