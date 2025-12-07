import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { User, Mail } from "lucide-react";

const USERS_API = "https://6934573e4090fe3bf01fae47.mockapi.io/api/v1/users";

const UserPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.comment) {
      toast({
        title: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(USERS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      toast({
        title: "Thank you for your feedback!",
        description: "Your message has been submitted successfully.",
      });

      setFormData({ name: "", email: "", comment: "" });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 min-h-[500px] rounded-xl overflow-hidden shadow-card">
          {/* Form Section - Dark background */}
          <div className="bg-primary p-8 md:p-12">
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">
              Tell us about your
            </h1>
            <h2 className="text-3xl font-bold text-blue-light mb-8">
              Concerns
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-primary-foreground/80 text-sm"
                >
                  Your Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/40" />
                  <Input
                    id="name"
                    placeholder="Enter Your Name here"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="pl-10 bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-primary-foreground/80 text-sm"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/40" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter Your Email here"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-10 bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="comment"
                  className="text-primary-foreground/80 text-sm"
                >
                  Description
                </Label>
                <Textarea
                  id="comment"
                  placeholder="Tell us about your concerns"
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 min-h-[120px] resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#365fbb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4172DC")
                }
                style={{
                  backgroundColor: "#4172DC",
                }}
                className="w-full text-primary py-6 text-base font-semibold"
              >
                {isSubmitting ? "SENDING..." : "SEND"}
              </Button>
            </form>
          </div>

          {/* Image Section */}
          <div className="hidden md:block relative">
            <img
              src="public\left.png"
              alt="Fashion models"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;
