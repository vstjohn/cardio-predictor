# =======================================================
# Phase 1 – Data Analysis & Preparation
# Cardiovascular Disease Dataset
# Author: Tori St. John
# =======================================================

import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import MinMaxScaler

# --- Folder Paths ---
BASE_DIR = os.getcwd()
DATA_DIR = os.path.join(BASE_DIR, "data")
PLOTS_DIR = os.path.join(BASE_DIR, "plots")
EXPORTS_DIR = os.path.join(BASE_DIR, "exports")

os.makedirs(PLOTS_DIR, exist_ok=True)
os.makedirs(EXPORTS_DIR, exist_ok=True)

# --- Load Dataset ---
df = pd.read_csv(os.path.join(DATA_DIR, "cardio_train.csv"), sep=";")
print("Data loaded:", df.shape, "rows and columns")

# --- Basic Info ---
print(df.info())
print(df.describe())

# --- Missing Values ---
print("\nMissing values per column:\n", df.isnull().sum())

# --- Histograms for Numeric Features ---
df.hist(figsize=(12,10))
plt.tight_layout()
plt.savefig(os.path.join(PLOTS_DIR, "all_histograms.png"))
plt.close()

# --- Boxplots for Key Columns ---
for col in ['height','weight','ap_hi','ap_lo']:
    sns.boxplot(x=df[col])
    plt.title(f'Boxplot of {col}')
    plt.savefig(os.path.join(PLOTS_DIR, f'boxplot_{col}.png'))
    plt.close()

# --- Categorical Feature Counts ---
categorical = ['gender','cholesterol','gluc','smoke','alco','active']
for col in categorical:
    sns.countplot(x=df[col])
    plt.title(f'Distribution of {col}')
    plt.savefig(os.path.join(PLOTS_DIR, f'countplot_{col}.png'))
    plt.close()

# --- Target Distribution ---
target_counts = df['cardio'].value_counts(normalize=True) * 100
print("\nTarget distribution (%):\n", target_counts)
sns.countplot(x=df['cardio'])
plt.title('Target Distribution (cardio: 1 = disease, 0 = healthy)')
plt.savefig(os.path.join(PLOTS_DIR, "target_distribution.png"))
plt.close()

# --- Normalize Numeric Columns ---
num_cols = ['age','height','weight','ap_hi','ap_lo']
scaler = MinMaxScaler()
df[num_cols] = scaler.fit_transform(df[num_cols])

# --- Save Summary Table ---
summary = df.describe().T[['min','max','mean','50%','std']]
summary.to_csv(os.path.join(EXPORTS_DIR, "feature_summary.csv"))
print("Saved summary to exports/feature_summary.csv")

print("\n Phase 1 analysis complete. All plots saved to folder.")
