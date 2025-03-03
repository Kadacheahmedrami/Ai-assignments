
import { DashboardLayout } from "@/components/DashboardLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardLayout> 
              <div className=" h-full w-full">
            
         
              {children}
  
            </div>
    </DashboardLayout>

  );
}
