'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Biomarker {
  name: string;
  standardRange: string;
  optimalRange: string;
  units: string;
  description: string;
}

interface BiomarkerCategory {
  id: string;
  name: string;
  biomarkers: Biomarker[];
}

const biomarkerCategories: BiomarkerCategory[] = [
  {
    id: 'lipids',
    name: 'Lipid Panel',
    biomarkers: [
      {
        name: 'Total Cholesterol',
        standardRange: '<200 mg/dL',
        optimalRange: '160-180 mg/dL',
        units: 'mg/dL',
        description: 'Lower is not always better',
      },
      {
        name: 'HDL Cholesterol',
        standardRange: '>40 mg/dL (M), >50 mg/dL (F)',
        optimalRange: '>60 mg/dL',
        units: 'mg/dL',
        description: 'Higher is better',
      },
      {
        name: 'LDL Cholesterol',
        standardRange: '<100 mg/dL',
        optimalRange: '70-100 mg/dL',
        units: 'mg/dL',
        description: 'Particle size matters',
      },
      {
        name: 'Triglycerides',
        standardRange: '<150 mg/dL',
        optimalRange: '<100 mg/dL',
        units: 'mg/dL',
        description: 'Lower is better',
      },
    ],
  },
  {
    id: 'metabolic',
    name: 'Metabolic Markers',
    biomarkers: [
      {
        name: 'Fasting Glucose',
        standardRange: '70-99 mg/dL',
        optimalRange: '75-85 mg/dL',
        units: 'mg/dL',
        description: 'Fasting blood sugar level',
      },
      {
        name: 'HbA1c',
        standardRange: '<5.7%',
        optimalRange: '<5.4%',
        units: '%',
        description: '3-month average blood sugar',
      },
      {
        name: 'Fasting Insulin',
        standardRange: '2.6-24.9 μIU/mL',
        optimalRange: '<5 μIU/mL',
        units: 'μIU/mL',
        description: 'Lower is better for insulin sensitivity',
      },
    ],
  },
  {
    id: 'thyroid',
    name: 'Thyroid Function',
    biomarkers: [
      {
        name: 'TSH',
        standardRange: '0.4-4.5 mIU/L',
        optimalRange: '1.0-2.0 mIU/L',
        units: 'mIU/L',
        description: 'Thyroid Stimulating Hormone',
      },
      {
        name: 'Free T3',
        standardRange: '2.3-4.2 pg/mL',
        optimalRange: '3.0-4.0 pg/mL',
        units: 'pg/mL',
        description: 'Active thyroid hormone',
      },
      {
        name: 'Free T4',
        standardRange: '0.8-1.8 ng/dL',
        optimalRange: '1.0-1.5 ng/dL',
        units: 'ng/dL',
        description: 'Inactive thyroid hormone',
      },
    ],
  },
];

const BiomarkerCard: React.FC<{ biomarker: Biomarker }> = ({ biomarker }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{biomarker.name}</h3>
          <div className="text-sm text-gray-600 mt-1">
            <div>Standard: {biomarker.standardRange}</div>
            <div>
              Optimal: <span className="text-green-600 font-medium">{biomarker.optimalRange}</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600"
        >
          {showDetails ? 'Hide' : 'Details'}
        </Button>
      </div>

      {showDetails && (
        <div className="mt-3 pt-3 border-t text-sm text-gray-600">
          <p>{biomarker.description}</p>
          <p className="mt-2 text-xs text-gray-500">Units: {biomarker.units}</p>
        </div>
      )}
    </div>
  );
};

export function BiomarkerVisualization() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Interactive Biomarker Reference</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="lipids">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {biomarkerCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {biomarkerCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.biomarkers.map((biomarker, index) => (
                  <BiomarkerCard key={index} biomarker={biomarker} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
          <p className="font-medium">Note:</p>
          <p className="mt-1">
            These ranges are general guidelines. Always consult with a healthcare professional for
            personalized advice.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
