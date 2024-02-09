import { PrismaClient } from  "@prisma/client"
const db = new PrismaClient();

async function main() {
  try {
    const categoriesData = [
      {
        name: 'Web Development',
        slug: 'web-development'
      },
      {
        name: 'Mobile Development',
        slug: 'mobile-development'
      },
      {
        name: 'Data Science',
        slug: 'data-science'
      },
      {
        name: 'Machine Learning',
        slug: 'machine-learning'
      }
    ];

    const createCategoryPromises = categoriesData.map(async (categoryData) => {
      return await db.category.create({
        data: categoryData
      });
    });

    const [web, mobile, data_science, machine_learning] = await Promise.all(
      createCategoryPromises
    );

    console.log({ web, mobile, data_science, machine_learning });
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
