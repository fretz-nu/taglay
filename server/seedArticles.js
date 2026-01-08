require('dotenv').config();
const mongoose = require('mongoose');
const Article = require('./models/Article');

const articles = [
  {
    name: "fastforest-overfitting-anomaly",
    title: "FastForest Overfitting Anomaly",
    severity: "Critical",
    content: [
      "Our custom FastForest algorithm initially reported an impressive 99% accuracy on the PhiUSIIL dataset. However, further investigation revealed a critical overfitting issue caused by improper hyperparameter configuration.",
      "The root cause was identified in the min_samples_leaf parameter being set to 1, which allowed individual leaf nodes to form with single samples. This created an overly complex decision boundary that perfectly memorized training data but failed to generalize.",
      "Cross-validation results showed a massive gap: training accuracy remained at 99% while validation accuracy dropped to 76%. This 23% delta is a classic indicator of model overfitting.",
      "The fix involved adjusting min_samples_leaf to 5 and implementing pruning at depth 12. Post-correction, FastForest achieved a more legitimate 88% accuracy with only a 3% train-validation gap.",
      "This discovery was pivotal for our research, demonstrating that algorithmic innovation must be balanced with proper regularization techniques to avoid false-positive performance metrics."
    ],
    isActive: true
  },
  {
    name: "randomforest-baseline-results",
    title: "RandomForest Baseline Results",
    severity: "Info",
    content: [
      "As our baseline comparison, scikit-learn's RandomForest classifier was trained on the PhiUSIIL dataset with 100 estimators and entropy-based splitting criterion.",
      "RandomForest achieved consistent 91% accuracy across both training and validation sets, with a minimal 1.5% performance delta indicating strong generalization capabilities.",
      "Feature importance analysis revealed that URL length, presence of IP addresses, and subdomain count were the top three predictive features, accounting for 67% of cumulative importance.",
      "The baseline model demonstrated robust performance with a precision of 0.89 and recall of 0.92, effectively balancing false positive and false negative rates for phishing detection.",
      "These stable results establish RandomForest as a reliable baseline for phishing URL detection, validating our experimental methodology and providing a solid foundation for algorithmic comparison."
    ],
    isActive: true
  },
  {
    name: "xgboost-gradient-boosting-performance",
    title: "XGBoost Gradient Boosting Performance",
    severity: "High",
    content: [
      "XGBoost, our third model, leverages gradient boosting with tree ensemble learning to achieve competitive results on the PhiUSIIL dataset through sequential error correction.",
      "Using an optimal learning rate of 0.1 with max depth of 6 and 200 estimators, XGBoost achieved 93% accuracy—the highest among all three models in our comparative study.",
      "The model's strength lies in its built-in L1 and L2 regularization parameters, which naturally prevent overfitting while maintaining high predictive power on unseen data.",
      "Training time was approximately 40% longer than RandomForest but justified by the 2% accuracy improvement and more consistent performance across different train-test splits.",
      "XGBoost's feature importance distribution showed greater emphasis on lexical features compared to FastForest, providing complementary insights into what makes a URL suspicious."
    ],
    isActive: true
  }
];

const seedArticles = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Clear existing articles (optional - remove if you want to keep existing)
    await Article.deleteMany({});
    console.log('Cleared existing articles');

    // Insert articles
    const inserted = await Article.insertMany(articles);
    console.log(`${inserted.length} articles seeded successfully!`);

    console.log('\nSeeded articles:');
    inserted.forEach(article => {
      console.log(`- ${article.title} (${article.severity})`);
    });

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    process.exit(0);
  }
};

seedArticles();
