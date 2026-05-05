export type ProjectStatus = "active" | "completed" | "upcoming";

export type FloorPlan = {
  type: "1+1" | "2+1" | "3+1";
  photos: string[];
};

export type Project = {
  slug: string;
  dictKey: "doganYasam" | "camlik" | "gunaltay";
  status: ProjectStatus;
  cover: string;
  hero: string;
  video?: string;
  renders?: string[];
  floorplans?: FloorPlan[];
  santiye?: string[];
  featured?: boolean;
};

const photos = (basePath: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${basePath}/photo-${i + 1}.jpg`);

const doganRender = (name: string) =>
  `/projects/dogan-yasam-evleri/renders/${name}.jpg`;

export const projects: Project[] = [
  {
    slug: "dogan-yasam-evleri",
    dictKey: "doganYasam",
    status: "active",
    featured: true,
    cover: "/projects/dogan-yasam-evleri/renders/exterior-day-1.jpg",
    hero: "/projects/dogan-yasam-evleri/renders/exterior-day-2.jpg",
    video: "/video/dogan-yasam-evleri.mp4",
    renders: [
      doganRender("exterior-day-1"),
      doganRender("exterior-day-2"),
      doganRender("render-9"),
      doganRender("render-10"),
      doganRender("render-7"),
      doganRender("render-8"),
      doganRender("render-1"),
      doganRender("render-2"),
      doganRender("render-3"),
      doganRender("render-4"),
      doganRender("render-5"),
      doganRender("render-6"),
    ],
    floorplans: [
      { type: "1+1", photos: photos("/projects/dogan-yasam-evleri/floorplans/1plus1", 21) },
      { type: "2+1", photos: photos("/projects/dogan-yasam-evleri/floorplans/2plus1", 35) },
      { type: "3+1", photos: photos("/projects/dogan-yasam-evleri/floorplans/3plus1", 30) },
    ],
    santiye: photos("/projects/dogan-yasam-evleri/santiye", 37),
  },
  {
    slug: "camlik",
    dictKey: "camlik",
    status: "completed",
    cover: "/projects/camlik/cover.jpg",
    hero: "/projects/camlik/cover.jpg",
    video: "/video/camlik.mp4",
    santiye: photos("/projects/camlik", 53),
  },
  {
    slug: "gunaltay",
    dictKey: "gunaltay",
    status: "completed",
    cover: "/projects/gunaltay/photo-1.jpg",
    hero: "/projects/gunaltay/photo-1.jpg",
    video: "/video/gunaltay.mp4",
    santiye: photos("/projects/gunaltay", 36),
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];
